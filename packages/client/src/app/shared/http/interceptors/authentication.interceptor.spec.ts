import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments';
import { DmaHttpRequestTestingModule } from '../../../../testing';
import { inMemoryStorageProvider, TOKEN_STORAGE_KEY } from '../../storage';
import { DmaHttpRequestService } from '../dma-http-request.service';
import { authenticationInterceptorProvider } from './authentication.interceptor';

describe('AuthenticationInterceptor', () => {
    function setupTestEnvironment(params?: { token: string }) {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [
                inMemoryStorageProvider(params?.token ? { [TOKEN_STORAGE_KEY]: params?.token } : undefined),
                authenticationInterceptorProvider,
                DmaHttpRequestService,
            ],
        });

        return {
            requestService: TestBed.inject(DmaHttpRequestService),
            testController: TestBed.inject(HttpTestingController),
        };
    }

    it('should not add the Authorization header when no token is found', async () => {
        const { requestService, testController } = setupTestEnvironment();

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        request.flush({});

        await response;

        expect(request.request.headers.has('Authorization')).toBeFalse();
    });

    it('should add the Authorization header when a token is found', async () => {
        const { requestService, testController } = setupTestEnvironment({ token: 'token' });

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        request.flush({});

        await response;

        const header = request.request.headers.get('Authorization');

        expect(header).toEqual('Bearer token');
    });
});
