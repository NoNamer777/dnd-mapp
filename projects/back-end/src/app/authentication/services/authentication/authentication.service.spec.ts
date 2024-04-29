import {
    mockLoggingServiceProvider,
    mockRoleModuleProviders,
    mockSessionProviders,
    mockTokenModuleProviders,
    mockUserModuleProviders,
} from '@dnd-mapp/back-end/testing';
import { SessionBuilder, SessionModel } from '@dnd-mapp/data';
import { defaultUser, mockSessionDB, mockTokenDB } from '@dnd-mapp/data/testing';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import crypto from 'node:crypto';
import { buildServerUrl } from '../../../common';
import { DndMappJwtModule, NestConfigModule, ServerConfig } from '../../../config';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    async function setupTest(params?: { prepareSession?: boolean; authCodeGenTimestamp?: Date }) {
        const module = await Test.createTestingModule({
            imports: [NestConfigModule, DndMappJwtModule],
            providers: [
                AuthenticationService,
                mockLoggingServiceProvider,
                ...mockUserModuleProviders,
                ...mockRoleModuleProviders,
                ...mockTokenModuleProviders,
                ...mockSessionProviders,
            ],
        }).compile();

        const { host, port, useSsl, address } = module.get(ConfigService).get<ServerConfig>('server');
        buildServerUrl(host, port, useSsl, address);

        let session: SessionModel;

        if (params?.prepareSession) {
            const codeChallenge = crypto
                .createHash('sha256')
                .update('my test code challenge')
                .digest()
                .toString('base64');
            const sessionBuilder = new SessionBuilder().withCodeChallenge(codeChallenge).withAuthorizationCode();

            if (params.authCodeGenTimestamp) {
                sessionBuilder.codeGeneratedAt(params.authCodeGenTimestamp);
            }
            session = mockSessionDB.create(sessionBuilder.build());
        }
        return {
            service: module.get(AuthenticationService),
            session: session,
        };
    }

    describe('login', () => {
        it(`should verify a User's credentials`, async () => {
            const { service } = await setupTest();

            await expect(
                service.login({ username: defaultUser.username, password: 'secure_password' })
            ).resolves.not.toThrow(BadRequestException);
        });

        it(`should throw bad request for unknown username`, async () => {
            const { service } = await setupTest();

            await expect(service.login({ username: 'Unknown User', password: 'secure_password' })).rejects.toThrow(
                BadRequestException
            );
        });

        it(`should throw bad request for invalid password`, async () => {
            const { service } = await setupTest();

            await expect(
                service.login({ username: defaultUser.username, password: 'secure_password1234' })
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe('getTokensForSession', () => {
        it('should generate tokens for User on Session', async () => {
            const { service, session } = await setupTest({ prepareSession: true });
            let storedTokens = mockTokenDB.findAllTokensForUser(defaultUser.id);

            expect(storedTokens).toHaveLength(0);

            await service.getTokensForSession(
                session,
                defaultUser.username,
                'my test code challenge',
                session.authorizationCode
            );
            storedTokens = mockTokenDB.findAllTokensForUser(defaultUser.id);

            expect(storedTokens).toHaveLength(2);
        });

        it('should generate tokens for User on Session without providing Authorization code', async () => {
            const { service, session } = await setupTest({ prepareSession: true });
            let storedTokens = mockTokenDB.findAllTokensForUser(defaultUser.id);

            expect(storedTokens).toHaveLength(0);

            await service.getTokensForSession(session, defaultUser.username);
            storedTokens = mockTokenDB.findAllTokensForUser(defaultUser.id);

            expect(storedTokens).toHaveLength(2);
        });

        it('should not generate tokens with invalid Authorization code', async () => {
            const { service, session } = await setupTest({ prepareSession: true });

            await expect(
                service.getTokensForSession(
                    session,
                    defaultUser.username,
                    'my test code challenge',
                    'invalid authorization code'
                )
            ).rejects.toThrow(BadRequestException);

            expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);
        });

        it('should not generate tokens when validating Authorization code outside validity period', async () => {
            const { service, session } = await setupTest({
                prepareSession: true,
                authCodeGenTimestamp: new Date(Date.now() - 40_0000),
            });

            await expect(
                service.getTokensForSession(
                    session,
                    defaultUser.username,
                    'my test code challenge',
                    session.authorizationCode
                )
            ).rejects.toThrow(BadRequestException);

            expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);
        });

        it('should not generate tokens when passing an invalid code challenge', async () => {
            const { service, session } = await setupTest({ prepareSession: true });

            await expect(
                service.getTokensForSession(
                    session,
                    defaultUser.username,
                    'my invalid code challenge',
                    session.authorizationCode
                )
            ).rejects.toThrow(BadRequestException);

            expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);
        });
    });
});
