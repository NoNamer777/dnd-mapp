import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments';
import { DmaHttpRequestTestingModule } from '../../../../testing';
import { StorageKey, StorageService, inMemoryStorageProvider } from '../../storage';
import { DmaHttpRequestService } from '../dma-http-request.service';
import { storeAuthenticationInterceptorProvider } from './store-authentication.interceptor';

describe('StoreAuthenticationInterceptor', () => {
    const token =
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5ODkxNjcxNCwibmJmIjoxNjk4OTE2NzE0LCJleHAiOjE2OTg5Mjc1MTR9.pK9FW6brgVsUJewKZ8sNn17mNnHj-pAx7Hbry2ZSiqTjTYzYtrB8WhBpcNQN9IYJzJ6GwZXLA4Og3Zord0E1bg';

    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [inMemoryStorageProvider(), storeAuthenticationInterceptorProvider, DmaHttpRequestService],
        });

        return {
            requestService: TestBed.inject(DmaHttpRequestService),
            testController: TestBed.inject(HttpTestingController),
            storageService: TestBed.inject(StorageService),
        };
    }

    it('should store a token when a valid token is found in the Authorization header', async () => {
        const { requestService, testController, storageService } = setupTestEnvironment();

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        expect(storageService.getItem(StorageKey.ACCESS_TOKEN)).toBeNull();

        request.flush({}, { headers: { Authorization: `Bearer ${token}` } });
        await response;

        expect(storageService.getItem(StorageKey.ACCESS_TOKEN)).toEqual(token);
    });

    it('should not store a token when no Authorization header is found', async () => {
        const { requestService, testController, storageService } = setupTestEnvironment();

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        expect(storageService.getItem(StorageKey.ACCESS_TOKEN)).toBeNull();

        request.flush({});
        await response;

        expect(storageService.getItem(StorageKey.ACCESS_TOKEN)).toBeNull();
    });

    it('should not store a token when an empty Authorization header is found', async () => {
        const { requestService, testController, storageService } = setupTestEnvironment();

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        expect(storageService.getItem(StorageKey.ACCESS_TOKEN)).toBeNull();

        request.flush({}, { headers: { Authorization: 'Bearer ' } });
        await response;

        expect(storageService.getItem(StorageKey.ACCESS_TOKEN)).toBeNull();
    });

    it('should not store a token when an invalid token is found in the Authorization header', async () => {
        const { requestService, testController, storageService } = setupTestEnvironment();

        const response = firstValueFrom(requestService.get('/example'));
        const request = testController.expectOne(`${environment.baseBackEndURL}/example`);

        expect(storageService.getItem(StorageKey.ACCESS_TOKEN)).toBeNull();

        request.flush({}, { headers: { Authorization: 'Bearer token' } });
        await response;

        expect(storageService.getItem(StorageKey.ACCESS_TOKEN)).toBeNull();
    });
});
