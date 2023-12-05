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
                inMemoryStorageProvider(params?.initWithStorage ? { [CLIENT_ID_STORAGE_KEY]: 'client_id' } : undefined),
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

        const request = testingController.expectOne(environment.baseBackEndURL + '/api/client');

        expect(request.request.url).not.toContain('?id=');

        request.flush({
            id: 'client_id',
            secret: 'client_secret',
        });

        expect(configService.config).toEqual({ clientId: 'client_id', clientSecret: 'client_secret' });
    });

    it('should retrieve a new secret when a client ID was stored in the storageService', () => {
        const { configService, testingController } = setupTestEnvironment({ initWithStorage: true });

        configService.initialize();

        const request = testingController.expectOne(environment.baseBackEndURL + '/api/client?id=client_id');

        expect(request.request.url).toContain('?id=');

        request.flush({
            id: 'client_id',
            secret: 'new_client_secret',
        });

        expect(configService.config).toEqual({ clientId: 'client_id', clientSecret: 'new_client_secret' });
    });

    it('should remove the stored client ID during initialization', () => {
        const { configService, storageService, testingController } = setupTestEnvironment({ initWithStorage: true });

        expect(storageService.getItem(CLIENT_ID_STORAGE_KEY)).toEqual('client_id');

        configService.initialize();
        testingController
            .expectOne(environment.baseBackEndURL + '/api/client?id=client_id')
            .flush({ id: 'client_id', secret: 'new_client_secret' });

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
        testingController
            .expectOne(environment.baseBackEndURL + '/api/client')
            .flush({ id: 'client_id', secret: 'client_secret' });

        configService.storeConfig();

        expect(storageService.getItem(CLIENT_ID_STORAGE_KEY)).toEqual('client_id');
    });
});
