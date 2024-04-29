import { mockLoggingServiceProvider, mockSessionProviders, mockTokenModuleProviders } from '@dnd-mapp/back-end/testing';
import { SessionBuilder } from '@dnd-mapp/data';
import { mockSessionDB } from '@dnd-mapp/data/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createId } from '@paralleldrive/cuid2';
import * as crypto from 'node:crypto';
import { DndMappJwtModule } from '../../../config';
import { SessionService } from './session.service';

describe('SessionService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            imports: [DndMappJwtModule],
            providers: [mockLoggingServiceProvider, ...mockSessionProviders, ...mockTokenModuleProviders],
        }).compile();

        return {
            service: module.get(SessionService),
        };
    }

    it('should initialize a Session', async () => {
        const { service } = await setupTest();

        expect(mockSessionDB.findAll()).toHaveLength(0);

        const session = await service.initialize();

        expect(mockSessionDB.findOneById(session.id)).toBeDefined();
    });

    it('should reset a Session', async () => {
        let session = new SessionBuilder().withAuthorizationCode().withCodeChallenge('challenge').build();
        mockSessionDB.create(session);

        const { service } = await setupTest();

        await service.resetAuthorization(session);
        session = mockSessionDB.findOneById(session.id);

        expect(session.authorizationCode).toBeNull();
        expect(session.authCodeGeneratedAt).toBeNull();
        expect(session.codeChallenge).toBeNull();
    });

    it('should remove an Session', async () => {
        const { id } = mockSessionDB.create(new SessionBuilder().build());
        const { service } = await setupTest();

        expect(mockSessionDB.findOneById(id)).toBeDefined();

        await service.end(id);
        expect(mockSessionDB.findOneById(id)).toBeNull();
    });

    it('should generate an Authorization code', async () => {
        const session = mockSessionDB.create(new SessionBuilder().build());

        const { service } = await setupTest();

        expect(session.authorizationCode).toBeNull();
        expect(session.authCodeGeneratedAt).toBeNull();

        await service.generateAuthorizationCode(session);
        expect(session.authorizationCode).toEqual(expect.any(String));
        expect(session.authCodeGeneratedAt).toEqual(expect.any(Date));
    });

    describe('findById', () => {
        it('should find one by ID', async () => {
            const session = mockSessionDB.create(new SessionBuilder().build());
            const { service } = await setupTest();

            expect(await service.findById(session.id)).toEqual(session);
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();

            await expect(service.findById(createId())).rejects.toThrow(NotFoundException);
        });
    });

    describe('verifyCodeChallenge', () => {
        it('should verify stored code challenge successfully', async () => {
            const codeChallenge = crypto
                .createHash('sha256')
                .update('my test code challenge')
                .digest()
                .toString('base64');
            const session = new SessionBuilder().withCodeChallenge(codeChallenge).build();

            mockSessionDB.create(session);

            const { service } = await setupTest();

            await expect(service.verifyCodeChallenge(session, 'my test code challenge')).resolves.not.toThrow();
        });

        it('should invalidate passed code challenge', async () => {
            const codeChallenge = crypto
                .createHash('sha256')
                .update('my test code challenge')
                .digest()
                .toString('base64');
            let session = new SessionBuilder().withCodeChallenge(codeChallenge).build();

            mockSessionDB.create(session);

            const { service } = await setupTest();

            await expect(service.verifyCodeChallenge(session, 'my code challenge')).rejects.toThrow(
                BadRequestException
            );
            session = mockSessionDB.findOneById(session.id);

            expect(session.codeChallenge).toBeNull();
        });
    });

    describe('verifyAuthorizationCode', () => {
        it('should verify the authorization code', async () => {
            const session = mockSessionDB.create(new SessionBuilder().withAuthorizationCode().build());
            const { service } = await setupTest();

            await expect(service.verifyAuthorizationCode(session, session.authorizationCode)).resolves.not.toThrow();
        });

        it('should reject an invalid authorization code', async () => {
            let session = mockSessionDB.create(new SessionBuilder().withAuthorizationCode().build());
            const { service } = await setupTest();

            await expect(service.verifyAuthorizationCode(session, 'random invalid code')).rejects.toThrow(
                BadRequestException
            );

            session = mockSessionDB.findOneById(session.id);
            expect(session.authorizationCode).toBeNull();
            expect(session.authCodeGeneratedAt).toBeNull();
        });

        it('should reject authorization code outside validity period', async () => {
            let session = mockSessionDB.create(
                new SessionBuilder()
                    .withAuthorizationCode()
                    .codeGeneratedAt(new Date(Date.now() - 40_0000))
                    .build()
            );
            const { service } = await setupTest();

            await expect(service.verifyAuthorizationCode(session, session.authorizationCode)).rejects.toThrow(
                BadRequestException
            );

            session = mockSessionDB.findOneById(session.id);
            expect(session.authorizationCode).toBeNull();
            expect(session.authCodeGeneratedAt).toBeNull();
        });
    });
});
