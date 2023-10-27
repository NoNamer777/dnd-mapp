import { defaultUser } from '@dnd-mapp/data/testing';
import { Test } from '@nestjs/testing';
import { mockUserRepositoryProvider } from '../../../testing';
import { mockLoggingServiceProvider } from '../../../testing/mock/db/common/mock-logging-service.provider';
import { UserService } from '../entities/user';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [mockUserRepositoryProvider, AuthenticationService, UserService, mockLoggingServiceProvider],
        }).compile();

        return {
            service: module.get(AuthenticationService),
        };
    }

    describe('login', () => {
        it('should handle login requests', async () => {
            const { service } = await setupTestEnvironment();
            const { username, password } = defaultUser;

            const user = await service.login({ username, password });

            expect(user).toEqual({ id: defaultUser.id, username: defaultUser.username });
        });

        it('should throw an 401 when providing an incorrect password', async () => {
            const { service } = await setupTestEnvironment();

            await expect(
                service.login({ username: defaultUser.username, password: 'incorrect_password' })
            ).rejects.toThrowError('Invalid username/password');
        });

        it('should throw an 401 when unable to find the User', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.login({ username: 'Bob', password: defaultUser.password })).rejects.toThrowError(
                'Invalid username/password'
            );
        });
    });

    describe('Sign up', () => {
        it('should handle sign up requests', async () => {
            const { service } = await setupTestEnvironment();

            const user = await service.signup({
                username: 'User2',
                password: 'secure_password',
                emailAddress: 'user2@domain.com',
            });

            expect(user).toEqual(expect.objectContaining({ id: 2 }));
        });
    });
});
