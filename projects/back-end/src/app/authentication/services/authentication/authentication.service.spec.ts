import { User } from '@dnd-mapp/data';
import { defaultUser } from '@dnd-mapp/data/testing';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { mockLoggingServiceProvider, mockRoleModuleProviders, mockUserModuleProviders } from '../../../../../testing';
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
            ],
        }).compile();

        return {
            service: module.get(AuthenticationService),
            jwtService: module.get(JwtService),
        };
    }

    describe('login', () => {
        it('should handle login requests', async () => {
            const { service, jwtService } = await setupTestEnvironment();

            const token = await service.login({ username: defaultUser.username, password: 'secure_password' });
            const decodedToken = await jwtService.verifyAsync(token);

            expect(decodedToken.sub).toEqual(defaultUser.id);
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

            const user = await service.signup(new User('User2', 'secure_password', 'user2@domain.com'));

            expect(user.id).toEqual(expect.any(Number));
        });
    });
});
