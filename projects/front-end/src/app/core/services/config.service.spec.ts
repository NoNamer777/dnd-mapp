import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments';
import { DmaHttpRequestTestingModule } from '../../../testing';
import { StorageKey, StorageService, inMemoryStorageProvider } from '../../shared';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
    function setupTestEnvironment(params?: { initWithStorage: boolean }) {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [
                ConfigService,
                inMemoryStorageProvider(
                    params?.initWithStorage ? { [StorageKey.CLIENT_ID]: 'stored_client_id' } : undefined
                ),
            ],
        });

        spyOn(console, 'error');

        return {
            configService: TestBed.inject(ConfigService),
            storageService: TestBed.inject(StorageService),
            testingController: TestBed.inject(HttpTestingController),
        };
    }

    it('should retrieve a new config', async () => {
        const { configService, testingController } = setupTestEnvironment();
        const init = lastValueFrom(configService.initialize());

        const request = testingController.expectOne(environment.baseBackEndURL + '/api/client');
        request.flush({ id: 'client_id', state: request.request.body.state });

        await init;

        expect(await firstValueFrom(configService.config$)).toEqual({ id: 'client_id' });
    });

    it('should request an existing Client config when the Client ID was stored in storage', async () => {
        const { configService, testingController } = setupTestEnvironment({ initWithStorage: true });
        const init = lastValueFrom(configService.initialize());

        const request = testingController.expectOne(environment.baseBackEndURL + '/api/client/stored_client_id');
        request.flush({ id: 'stored_client_id', state: request.request.body.state });

        await init;

        expect(await firstValueFrom(configService.config$)).toEqual({ id: 'stored_client_id' });
    });

    it('should initialize a new Client config if the old one could not be found on the back-end', async () => {
        const { configService, testingController } = setupTestEnvironment({ initWithStorage: true });
        const init = lastValueFrom(configService.initialize());

        const notFound = testingController.expectOne(environment.baseBackEndURL + '/api/client/stored_client_id');
        notFound.flush(
            { message: `Could not find Client with ID: 'stored_client_id'`, statusCode: 404, error: 'Not Found' },
            { status: 404, statusText: 'Not Found' }
        );

        const request = testingController.expectOne(environment.baseBackEndURL + '/api/client');
        request.flush({ id: 'client_id', state: request.request.body.state });

        await init;

        expect(await firstValueFrom(configService.config$)).toEqual({ id: 'client_id' });
    });

    it('should throw an error when returning any other error code than 404 when retrieving an existing Client config', async () => {
        const { configService, testingController } = setupTestEnvironment({ initWithStorage: true });
        const init = lastValueFrom(configService.initialize());

        const notFound = testingController.expectOne(environment.baseBackEndURL + '/api/client/stored_client_id');
        notFound.flush(
            { statusCode: 500, error: 'Internal Server Error' },
            { status: 500, statusText: 'Internal Server Error' }
        );

        await expectAsync(init).toBeRejected();
    });

    it('should throw an error when the state present in the request', async () => {
        const { configService, testingController } = setupTestEnvironment();
        const init = lastValueFrom(configService.initialize());

        const request = testingController.expectOne(environment.baseBackEndURL + '/api/client');

        request.flush({ id: 'client_id' });

        await expectAsync(init).toBeRejected();
    });

    it('should remove the stored client ID during initialization', async () => {
        const { configService, storageService, testingController } = setupTestEnvironment({ initWithStorage: true });
        const init = lastValueFrom(configService.initialize());

        const request = testingController.expectOne(environment.baseBackEndURL + '/api/client/stored_client_id');
        request.flush({ id: 'stored_client_id', state: request.request.body.state });

        await init;

        expect(storageService.getItem(StorageKey.CLIENT_ID)).toBeNull();
    });

    it(`should not store the client ID when it's not defined`, () => {
        const { configService, storageService } = setupTestEnvironment();

        configService.storeConfig();

        expect(storageService.getItem(StorageKey.CLIENT_ID)).toBeNull();
    });

    it(`should store the client ID when it's defined`, async () => {
        const { configService, storageService, testingController } = setupTestEnvironment();
        const init = lastValueFrom(configService.initialize());

        const request = testingController.expectOne(environment.baseBackEndURL + '/api/client');
        request.flush({ id: 'client_id', state: request.request.body.state });

        await init;

        configService.storeConfig();

        expect(storageService.getItem(StorageKey.CLIENT_ID)).toEqual('client_id');
    });
});
