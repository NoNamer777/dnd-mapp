import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments';
import { DmaHttpRequestTestingModule } from '../../../testing';
import { CLIENT_ID_STORAGE_KEY, inMemoryStorageProvider, StorageService } from '../../shared';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
    function setupTestEnvironment(params?: { initWithStorage: boolean }) {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [
                ConfigService,
                inMemoryStorageProvider(
                    params?.initWithStorage ? { [CLIENT_ID_STORAGE_KEY]: 'stored_client_id' } : undefined
                ),
            ],
        });

        return {
            configService: TestBed.inject(ConfigService),
            storageService: TestBed.inject(StorageService),
            testingController: TestBed.inject(HttpTestingController),
        };
    }

    it('should retrieve a new config', () => {
        const { configService, testingController } = setupTestEnvironment();

        configService.initialize();

        const request = testingController.expectOne((request) =>
            request.url.startsWith(environment.baseBackEndURL + '/api/client?state=')
        );

        expect(request.request.url).not.toContain('?id=');

        request.flush({
            clientId: 'client_id',
            state: request.request.url.split('=')[1],
        });

        expect(configService.config).toEqual({ clientId: 'client_id' });
    });

    it('should throw an error when the state present in the request', async () => {
        const { configService, testingController } = setupTestEnvironment();
        const spy = spyOn(configService, 'initialize').and.callThrough();

        configService.initialize();

        const request = testingController.expectOne((request) =>
            request.url.startsWith(environment.baseBackEndURL + '/api/client?state=')
        );

        request.flush({ clientId: 'client_id' });

        expect(spy).toThrowError('State validation error');
    });

    it('should not request a client ID when one was stored in storage already', () => {
        const { configService, testingController } = setupTestEnvironment({ initWithStorage: true });

        configService.initialize();

        testingController.expectNone((request) =>
            request.url.startsWith(environment.baseBackEndURL + '/api/client?state=')
        );

        expect(configService.config).toEqual({ clientId: 'stored_client_id' });
    });

    it('should remove the stored client ID during initialization', () => {
        const { configService, storageService } = setupTestEnvironment({ initWithStorage: true });

        expect(storageService.getItem(CLIENT_ID_STORAGE_KEY)).toEqual('stored_client_id');

        configService.initialize();

        expect(storageService.getItem(CLIENT_ID_STORAGE_KEY)).toBeNull();
    });

    it(`should not store the client ID when it's not defined`, () => {
        const { configService, storageService } = setupTestEnvironment();

        configService.storeConfig();

        expect(storageService.getItem(CLIENT_ID_STORAGE_KEY)).toBeNull();
    });

    it(`should store the client ID when it's defined`, () => {
        const { configService, storageService, testingController } = setupTestEnvironment();

        configService.initialize();

        const request = testingController.expectOne((request) =>
            request.url.startsWith(environment.baseBackEndURL + '/api/client?state=')
        );
        request.flush({
            clientId: 'client_id',
            state: request.request.url.split('=')[1],
        });

        configService.storeConfig();

        expect(storageService.getItem(CLIENT_ID_STORAGE_KEY)).toEqual('client_id');
    });
});
