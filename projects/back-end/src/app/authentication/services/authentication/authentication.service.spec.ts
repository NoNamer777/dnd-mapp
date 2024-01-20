import { UserModel } from '@dnd-mapp/data';
import { defaultClient, defaultUser, mockClientDB, mockUserDB } from '@dnd-mapp/data/testing';
import { Test } from '@nestjs/testing';
import {
    mockClientModuleProviders,
    mockLoggingServiceProvider,
    mockRoleModuleProviders,
    mockUserModuleProviders,
} from '../../../../../testing';
import { DndMappJwtModule, NestConfigModule } from '../../../config';
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
                ...mockClientModuleProviders,
            ],
        }).compile();

        return {
            service: module.get(AuthenticationService),
        };
    }

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

    describe('login', () => {
        it('should handle login requests', async () => {
            const { service } = await setupTestEnvironment();

            await expect(
                service.login({ username: defaultUser.username, password: 'secure_password' })
            ).resolves.not.toThrow();
        });

        it('should throw an 401 when providing an incorrect password', async () => {
            const { service } = await setupTestEnvironment();

            await expect(
                service.login({ username: defaultUser.username, password: 'incorrect_password' })
            ).rejects.toThrow('Invalid username/password');
        });

        it('should throw an 401 when unable to find the User', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.login({ username: 'Bob', password: defaultUser.password })).rejects.toThrow(
                'Invalid username/password'
            );
        });
    });
});
