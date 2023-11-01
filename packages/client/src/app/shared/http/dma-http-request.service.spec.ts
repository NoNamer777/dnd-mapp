import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments';
import { DmaHttpRequestTestingModule } from '../../../testing';
import { withInMemoryStorage } from '../storage';
import { DmaHttpRequestService } from './dma-http-request.service';

describe('DmaHttpRequestService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [withInMemoryStorage()],
        });

        return {
            service: TestBed.inject(DmaHttpRequestService),
            testingController: TestBed.inject(HttpTestingController),
        };
    }

    afterEach(() => {
        TestBed.inject(HttpTestingController).verify();
    });

    it('should send a GET request', async () => {
        const { service, testingController } = setupTestEnvironment();

        const response = firstValueFrom(service.get('/example'));

        const request = testingController.expectOne(environment.baseBackEndURL + '/example');
        request.flush({ example: 'hi' });

        expect(await response).toEqual({ example: 'hi' });
        expect(request.request.method).toEqual('GET');
    });

    it('should send a POST request', async () => {
        const { service, testingController } = setupTestEnvironment();

        const response = firstValueFrom(service.post('/example', { name: 'user' }));

        const request = testingController.expectOne(environment.baseBackEndURL + '/example');
        request.flush({ name: 'user1' });

        expect(await response).toEqual({ name: 'user1' });
        expect(request.request.method).toEqual('POST');
        expect(request.request.body).toEqual({ name: 'user' });
    });

    it('should send a DELETE request', async () => {
        const { service, testingController } = setupTestEnvironment();

        const response = firstValueFrom(service.delete('/example'));

        const request = testingController.expectOne(environment.baseBackEndURL + '/example');
        request.flush(null);

        await response;

        expect(request.request.method).toEqual('DELETE');
    });

    it('should send a PUT request', async () => {
        const { service, testingController } = setupTestEnvironment();

        const response = firstValueFrom(service.put('/example', { name: 'user1' }));

        const request = testingController.expectOne(environment.baseBackEndURL + '/example');
        request.flush({ name: 'user1' });

        expect(await response).toEqual({ name: 'user1' });
        expect(request.request.method).toEqual('PUT');
    });
});
