import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments';
import { provideDmaHttpTesting } from '../../../../../testing';
import { ConfigService } from '../../../../core/services/config.service';
import { DmaHttpRequestService } from '../../dma-http-request.service';

describe('ClientIdHeaderInterceptor', () => {
    async function setupEnvironment(params: { initConfig: boolean } = { initConfig: true }) {
        TestBed.configureTestingModule({
            providers: [provideDmaHttpTesting()],
        });

        const testingController = TestBed.inject(HttpTestingController);

        if (params.initConfig) {
            await initializeConfig(testingController);
        }
        return {
            requestService: TestBed.inject(DmaHttpRequestService),
            testingController: testingController,
        };
    }

    async function initializeConfig(testingController: HttpTestingController) {
        const configService = TestBed.inject(ConfigService);
        const init = firstValueFrom(configService.initialize());

        const response = testingController.expectOne(environment.baseBackEndURL + '/api/client');
        response.flush({ id: 'client_id', state: response.request.body.state });

        await init;
    }

    afterEach(() => TestBed.inject(HttpTestingController).verify());

    it('should add Client ID header when Client ID is available', async () => {
        const { requestService, testingController } = await setupEnvironment();

        const response = firstValueFrom(requestService.get('/example'));
        const request = testingController.expectOne(environment.baseBackEndURL + '/example');

        expect(request.request.headers.get('Dma-Client-Id')).toEqual('client_id');

        request.flush(null);

        await response;
    });

    it('should not add Client ID header when Client ID is available', async () => {
        const { requestService, testingController } = await setupEnvironment({ initConfig: false });

        const response = firstValueFrom(requestService.get('/example'));
        const request = testingController.expectOne(environment.baseBackEndURL + '/example');

        expect(request.request.headers.has('Dma-Client-Id')).toBeFalse();

        request.flush(null);

        await response;
    });
});
