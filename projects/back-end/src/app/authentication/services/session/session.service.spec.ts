import { SessionModel } from '@dnd-mapp/data';
import { defaultSession, mockSessionDB } from '@dnd-mapp/data/testing';
import { ForbiddenException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { mockLoggingServiceProvider, mockSessionProviders } from '../../../../../testing';
import { SessionService } from './session.service';

describe('SessionService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockSessionProviders],
        }).compile();

        return {
            service: module.get(SessionService),
        };
    }

    it('should reset authorization', async () => {
        defaultSession.authCodeGeneratedAt = new Date();
        defaultSession.codeChallenge = 'code_challenge';
        defaultSession.authorizationCode = 'authorization_code';

        const { service } = await setupTestEnvironment();

        expect(mockSessionDB.findOneById(defaultSession.id)).toEqual(
            expect.objectContaining({
                codeGeneratedAt: expect.any(Date),
                codeChallenge: 'code_challenge',
                authorizationCode: 'authorization_code',
            })
        );

        await service.resetAuthorization(defaultSession);

        expect(mockSessionDB.findOneById(defaultSession.id)).toEqual(
            expect.objectContaining({
                codeGeneratedAt: null,
                codeChallenge: null,
                authorizationCode: null,
            })
        );
    });

    describe('initialize', () => {
        it('should initialize', async () => {
            const { service } = await setupTestEnvironment();

            expect(mockSessionDB.findAll()).toHaveLength(1);

            const session = await service.initialize();

            expect(mockSessionDB.findOneById(session.id)).toBeDefined();
            expect(mockSessionDB.findAll()).toHaveLength(2);
        });
    });

    describe('findById', () => {
        it('should find a Session by ID', async () => {
            const { service } = await setupTestEnvironment();
            const { id } = defaultSession;

            expect(await service.findById(id)).toEqual(defaultSession);
        });

        it('should not find a Session by ID and not throw', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findById(nanoid(32), false)).toBeNull();
        });

        it('should throw a 404 when not being able to find a Session by ID', async () => {
            const { service } = await setupTestEnvironment();
            const id = nanoid(32);

            await expect(service.findById(id)).rejects.toThrow(`Couldn't find Session: '${id}'`);
        });
    });

    describe('update', () => {
        it('should update an existing Session', async () => {
            const { service } = await setupTestEnvironment();

            defaultSession.codeChallenge = 'code_challenge';

            await expect(service.update(defaultSession)).resolves.not.toThrow();
            expect(mockSessionDB.findOneById(defaultSession.id).codeChallenge).toEqual('code_challenge');
        });

        it('should not update when a Session does not exist', async () => {
            const { service } = await setupTestEnvironment();
            const session = new SessionModel();

            await expect(service.update(session)).rejects.toThrow(
                `Could not update session: '${session.id}' because it does not exist`
            );
        });
    });

    describe('generateAuthorizationCode', () => {
        it('should generate an authorization code for a Session', async () => {
            const { service } = await setupTestEnvironment();
            const { id } = defaultSession;

            expect(defaultSession.authorizationCode).toBeNull();
            expect(defaultSession.authCodeGeneratedAt).toBeNull();

            await service.generateAuthorizationCode(id);

            const { authorizationCode, authCodeGeneratedAt } = mockSessionDB.findOneById(defaultSession.id);

            expect(authorizationCode).not.toBeNull();
            expect(authCodeGeneratedAt).not.toBeNull();
        });

        it('should not generate an authorization code for a Session that does not exist', async () => {
            const { service } = await setupTestEnvironment();
            const id = nanoid(32);

            await expect(service.generateAuthorizationCode(id)).rejects.toThrow(
                `Could not generate authorization code for Session: '${id}' because it does not exist`
            );
        });
    });

    describe('verifyCodeChallengeForSession', () => {
        it('should verify the code challenge', async () => {
            defaultSession.codeChallenge = crypto
                .createHash('sha256')
                .update('code_challenge')
                .digest()
                .toString('base64');

            const { service } = await setupTestEnvironment();

            await expect(service.verifyCodeChallenge(defaultSession, 'code_challenge')).resolves.not.toThrow();
        });

        it('should fail to verify the code challenge', async () => {
            defaultSession.codeChallenge = 'code_challenge';

            const { service } = await setupTestEnvironment();

            await expect(service.verifyCodeChallenge(defaultSession, 'code_challenge')).rejects.toThrow(
                new ForbiddenException()
            );

            expect(defaultSession.codeChallenge).toBeNull();
        });
    });

    describe('verifyAuthorizationCodeForSession', () => {
        it('should verify the authorization code', async () => {
            defaultSession.authCodeGeneratedAt = new Date();
            defaultSession.authorizationCode = 'authorization_code';

            const { service } = await setupTestEnvironment();

            await expect(service.verifyAuthorizationCode(defaultSession, 'authorization_code')).resolves.not.toThrow();
        });

        it('should throw when verifying the authorization code outside of the validity window', async () => {
            defaultSession.authCodeGeneratedAt = new Date(2000, 1, 1, 1, 1, 1, 1);
            defaultSession.authorizationCode = 'authorization_code';

            const { service } = await setupTestEnvironment();

            await expect(service.verifyAuthorizationCode(defaultSession, 'authorization_code')).rejects.toThrow(
                new ForbiddenException()
            );
        });

        it('should throw when verifying the authorization code with an invalid code', async () => {
            defaultSession.authCodeGeneratedAt = new Date();
            defaultSession.authorizationCode = 'authorization_code';

            const { service } = await setupTestEnvironment();

            await expect(service.verifyAuthorizationCode(defaultSession, 'invalid_code')).rejects.toThrow(
                new ForbiddenException()
            );
        });
    });

    describe('end', () => {
        it('should end a session', async () => {
            const { service } = await setupTestEnvironment();
            const { id } = defaultSession;

            expect(mockSessionDB.findAll()).toHaveLength(1);

            await service.end(id);
            expect(mockSessionDB.findAll()).toHaveLength(0);
            expect(mockSessionDB.findOneById(id)).toBeNull();
        });

        it('should throw an 404 while trying to remove a session', async () => {
            const { service } = await setupTestEnvironment();
            const id = nanoid(32);

            await expect(service.end(id)).rejects.toThrow(`Couldn't remove Session: '${id}' because it does not exist`);
        });
    });
});
