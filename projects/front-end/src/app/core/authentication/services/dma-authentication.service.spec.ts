import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { defaultUser } from '@dnd-mapp/data/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments';
import { DmaHttpRequestTestingModule } from '../../../../testing';
import { TOKEN_STORAGE_KEY, inMemoryStorageProvider } from '../../../shared';
import { UserService } from '../../../user';
import { DmaAuthenticationService } from './dma-authentication.service';

describe('DmaAuthenticationService', () => {
    const token =
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5ODkxNjcxNCwibmJmIjoxNjk4OTE2NzE0LCJleHAiOjE2OTg5Mjc1MTR9.pK9FW6brgVsUJewKZ8sNn17mNnHj-pAx7Hbry2ZSiqTjTYzYtrB8WhBpcNQN9IYJzJ6GwZXLA4Og3Zord0E1bg';

    async function setupTestEnvironment(params: { token?: string } = {}) {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [
                UserService,
                DmaAuthenticationService,
                inMemoryStorageProvider(params.token !== undefined ? { [TOKEN_STORAGE_KEY]: params.token } : undefined),
            ],
        });

        return {
            authenticationService: TestBed.inject(DmaAuthenticationService),
            testController: TestBed.inject(HttpTestingController),
        };
    }

    async function handleInitialization() {
        const testController = TestBed.inject(HttpTestingController);
        const { id, username, roles } = defaultUser;

        const request = testController.expectOne(`${environment.baseBackEndURL}/api/user/1`);

        request.flush({ id, username, roles });
    }

    afterEach(() => TestBed.inject(HttpTestingController).verify());

    it('should not initialize an authenticated User when no token is found in the storage', async () => {
        const { authenticationService } = await setupTestEnvironment();

        expect(await firstValueFrom(authenticationService.authenticatedUser$)).toBeNull();
    });

    it('should not initialize an authenticated User when a incorrect token format is found in the storage', async () => {
        const { authenticationService } = await setupTestEnvironment({ token: 'ma.d' });

        expect(await firstValueFrom(authenticationService.authenticatedUser$)).toBeNull();
    });

    it('should initialize an authenticated User when a token is found in the storage', async () => {
        const { authenticationService } = await setupTestEnvironment({ token });

        await handleInitialization();

        expect(await firstValueFrom(authenticationService.authenticatedUser$)).toEqual(
            jasmine.objectContaining({ id: defaultUser.id, username: defaultUser.username, roles: defaultUser.roles })
        );
    });

    it('should be processing log in requests without throwing errors.', async () => {
        const { authenticationService, testController } = await setupTestEnvironment();

        const response = firstValueFrom(authenticationService.login('user1', 'secure_password'));
        const request = testController.expectOne(environment.baseBackEndURL + '/authentication/login');

        request.flush(null, {
            status: 200,
            statusText: 'success',
            headers: {
                Authorization: 'Bearer token',
            },
        });

        expect(async () => await response).not.toThrow();
    });

    it('should throw errors when processing httpErrorResponses', async () => {
        const { authenticationService, testController } = await setupTestEnvironment();

        const response = firstValueFrom(authenticationService.login('user1', 'secure_password'));
        const request = testController.expectOne(environment.baseBackEndURL + '/authentication/login');

        request.flush(null, {
            status: 500,
            statusText: 'internal server error',
        });

        await expectAsync(response).toBeRejected();
    });
});
