import { UserBuilder } from '@dnd-mapp/data';
import { defaultSession, defaultUser, mockSessionDB, mockTokenDB, mockUserDB } from '@dnd-mapp/data/testing';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import crypto from 'crypto';
import {
    mockLoggingServiceProvider,
    mockRoleModuleProviders,
    mockSessionProviders,
    mockTokenModuleProviders,
    mockUserModuleProviders,
} from '@dnd-mapp/back-end/testing';
import { buildServerUrl } from '../../../common';
import { DndMappJwtModule, NestConfigModule, ServerConfig } from '../../../config';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    async function setupTestEnvironment() {
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

        return {
            service: module.get(AuthenticationService),
        };
    }

    it('should return the active Session tokens for a User', async () => {
        defaultSession.codeChallenge = crypto.createHash('sha256').update('code_challenge').digest().toString('base64');

        defaultSession.authorizationCode = 'authorization_code';
        defaultSession.authCodeGeneratedAt = new Date();

        const { service } = await setupTestEnvironment();

        // Generate the tokens
        await service.login({ username: defaultUser.username, password: 'secure_password' }, defaultSession);

        const tokens = await service.getTokensForSession(
            defaultSession,
            defaultUser.username,
            'code_challenge',
            'authorization_code'
        );

        expect(tokens.size).toEqual(3);
    });

    it('should generate an authorization code for a Session', async () => {
        const { service } = await setupTestEnvironment();

        await expect(service.generateAuthorizationCode(defaultSession.id)).resolves.not.toThrow();
    });

    it('should handle sign up requests', async () => {
        const { service } = await setupTestEnvironment();
        const user = await service.signup(
            new UserBuilder()
                .withUsername('User2')
                .withPassword('secure_password')
                .withPassword('user2@domain.com')
                .build()
        );

        expect(user.id).toEqual(expect.any(Number));
        expect(mockUserDB.findAll()).toHaveLength(2);
        expect(mockUserDB.findOneByUsername('User2')).toEqual(expect.objectContaining(user));
    });

    it('should store a code challenge for a Session', async () => {
        const { service } = await setupTestEnvironment();
        const { id } = defaultSession;

        await service.storeCodeChallenge(id, 'code_challenge');

        expect(mockSessionDB.findOneById(id).codeChallenge).toEqual('code_challenge');
    });

    it('should revoke active tokens on log out', async () => {
        const { service } = await setupTestEnvironment();

        await service.login({ username: defaultUser.username, password: 'secure_password' }, defaultSession);

        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(3);

        await service.logout(defaultUser, defaultSession);

        expect(mockTokenDB.findActiveTokensForUserSession(defaultUser.id, defaultSession.id)).toHaveLength(0);
    });

    describe('login', () => {
        it('should handle login requests', async () => {
            const { service } = await setupTestEnvironment();

            await expect(
                service.login({ username: defaultUser.username, password: 'secure_password' }, defaultSession)
            ).resolves.not.toThrow();

            expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(3);
        });

        it('should throw an 401 when providing an incorrect password', async () => {
            const { service } = await setupTestEnvironment();

            await expect(
                service.login({ username: defaultUser.username, password: 'incorrect_password' }, defaultSession)
            ).rejects.toThrow('Invalid username/password');

            expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);
        });

        it('should throw an 401 when unable to find the User', async () => {
            const { service } = await setupTestEnvironment();

            await expect(
                service.login({ username: 'Bob', password: defaultUser.password }, defaultSession)
            ).rejects.toThrow('Invalid username/password');

            expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);
        });
    });
});
