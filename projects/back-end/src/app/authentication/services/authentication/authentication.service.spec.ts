import { UserModel } from '@dnd-mapp/data';
import { defaultClient, defaultUser, mockClientDB, mockTokenDB, mockUserDB } from '@dnd-mapp/data/testing';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import crypto from 'crypto';
import {
    mockClientModuleProviders,
    mockLoggingServiceProvider,
    mockRoleModuleProviders,
    mockUserModuleProviders,
} from '../../../../../testing';
import { mockTokenModuleProviders } from '../../../../../testing/mock/entities/authentication/mock-token-module.provider';
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
                ...mockClientModuleProviders,
            ],
        }).compile();

        const { host, port, useSsl, address } = module.get(ConfigService).get<ServerConfig>('server');

        buildServerUrl(host, port, useSsl, address);

        return {
            service: module.get(AuthenticationService),
        };
    }

    it('should return the active Client tokens for a User', async () => {
        defaultClient.codeChallenge = crypto.createHash('sha256').update('code_challenge').digest().toString('base64');

        defaultClient.authorizationCode = 'authorization_code';
        defaultClient.codeGeneratedAt = new Date();

        const { service } = await setupTestEnvironment();

        // Generate the tokens
        await service.login({ username: defaultUser.username, password: 'secure_password' }, defaultClient);

        const tokens = await service.getTokensForClient(
            defaultClient,
            'code_challenge',
            'authorization_code',
            defaultUser.username
        );

        expect(tokens.size).toEqual(3);
    });

    it('should generate an authorization code for a client', async () => {
        const { service } = await setupTestEnvironment();

        await expect(service.generateAuthorizationCode(defaultClient.id)).resolves.not.toThrow();
    });

    it('should handle sign up requests', async () => {
        const { service } = await setupTestEnvironment();
        const user = await service.signup(new UserModel('User2', 'secure_password', 'user2@domain.com'));

        expect(user.id).toEqual(expect.any(Number));
        expect(mockUserDB.findAll()).toHaveLength(2);
        expect(mockUserDB.findOneByUsername('User2')).toEqual(expect.objectContaining(user));
    });

    it('should store a code challenge for a Client', async () => {
        const { service } = await setupTestEnvironment();
        const { id } = defaultClient;

        await service.storeClientChallenge(id, 'code_challenge');

        expect(mockClientDB.findOneById(id).codeChallenge).toEqual('code_challenge');
    });

    it('should revoke active tokens on log out', async () => {
        const { service } = await setupTestEnvironment();

        await service.login({ username: defaultUser.username, password: 'secure_password' }, defaultClient);

        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(3);

        await service.logout(defaultUser, defaultClient);

        expect(mockTokenDB.findActiveTokensForUserOnClient(defaultUser.id, defaultClient.id)).toHaveLength(0);
    });

    describe('login', () => {
        it('should handle login requests', async () => {
            const { service } = await setupTestEnvironment();

            await expect(
                service.login({ username: defaultUser.username, password: 'secure_password' }, defaultClient)
            ).resolves.not.toThrow();

            expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(3);
        });

        it('should throw an 401 when providing an incorrect password', async () => {
            const { service } = await setupTestEnvironment();

            await expect(
                service.login({ username: defaultUser.username, password: 'incorrect_password' }, defaultClient)
            ).rejects.toThrow('Invalid username/password');

            expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);
        });

        it('should throw an 401 when unable to find the User', async () => {
            const { service } = await setupTestEnvironment();

            await expect(
                service.login({ username: 'Bob', password: defaultUser.password }, defaultClient)
            ).rejects.toThrow('Invalid username/password');

            expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);
        });
    });
});
