import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments';
import { DmaHttpRequestTestingModule } from '../../../../testing';
import { inMemoryStorageProvider, StorageKey } from '../../storage';
import { DmaHttpRequestService } from '../dma-http-request.service';
import { authenticationInterceptorProvider } from './authentication.interceptor';

describe('AuthenticationInterceptor', () => {
    const token =
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5ODkxNjcxNCwibmJmIjoxNjk4OTE2NzE0LCJleHAiOjE2OTg5Mjc1MTR9.pK9FW6brgVsUJewKZ8sNn17mNnHj-pAx7Hbry2ZSiqTjTYzYtrB8WhBpcNQN9IYJzJ6GwZXLA4Og3Zord0E1bg';

    function setupTestEnvironment(params?: { token: string }) {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [
                inMemoryStorageProvider(params?.token ? { [StorageKey.ACCESS_TOKEN]: params?.token } : undefined),
                authenticationInterceptorProvider,
                DmaHttpRequestService,
            ],
        });

        return {
            requestService: TestBed.inject(DmaHttpRequestService),
            testController: TestBed.inject(HttpTestingController),
        };
    }

    it('should add the Authorization header when a token is found', async () => {
        const { requestService, testController } = setupTestEnvironment({ token });

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        request.flush({});

        await response;

        const header = request.request.headers.get('Authorization');

        expect(header).toEqual(`Bearer ${token}`);
    });

    it('should not add the Authorization header when no token is found', async () => {
        const { requestService, testController } = setupTestEnvironment();

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        request.flush({});

        await response;

        expect(request.request.headers.has('Authorization')).toBeFalse();
    });

    it('should not add the Authorization header when no valid token is found', async () => {
        const { requestService, testController } = setupTestEnvironment({ token: '  ' });

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        request.flush({});

        await response;

        expect(request.request.headers.has('Authorization')).toBeFalse();
    });

    it('should not add the Authorization header when no valid token is found', async () => {
        const { requestService, testController } = setupTestEnvironment({ token: 'token' });

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        request.flush({});

        await response;

        expect(request.request.headers.has('Authorization')).toBeFalse();
    });

    it('should not add the Authorization header when no valid token is found', async () => {
        const { requestService, testController } = setupTestEnvironment({ token: 'a.a' });

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        request.flush({});

        await response;

        expect(request.request.headers.has('Authorization')).toBeFalse();
    });
});
