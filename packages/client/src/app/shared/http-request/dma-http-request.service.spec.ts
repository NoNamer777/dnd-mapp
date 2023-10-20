import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { DmaHttpRequestModule } from './dma-http-request.module';
import { DmaHttpRequestService } from './dma-http-request.service';

describe('DmaHttpRequestService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestModule, HttpClientTestingModule],
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

        const request = testingController.expectOne('http://localhost:8080/example');
        request.flush({ example: 'hi' });

        expect(await response).toEqual({ example: 'hi' });
        expect(request.request.method).toEqual('GET');
    });

    it('should send a POST request', async () => {
        const { service, testingController } = setupTestEnvironment();

        const response = firstValueFrom(service.post('/example', { name: 'user' }));

        const request = testingController.expectOne('http://localhost:8080/example');
        request.flush({ name: 'user1' });

        expect(await response).toEqual({ name: 'user1' });
        expect(request.request.method).toEqual('POST');
        expect(request.request.body).toEqual({ name: 'user' });
    });

    it('should send a DELETE request', async () => {
        const { service, testingController } = setupTestEnvironment();

        const response = firstValueFrom(service.delete('/example'));

        const request = testingController.expectOne('http://localhost:8080/example');
        request.flush(null);

        await response;

        expect(request.request.method).toEqual('DELETE');
    });

    it('should send a PUT request', async () => {
        const { service, testingController } = setupTestEnvironment();

        const response = firstValueFrom(service.put('/example', { name: 'user1' }));

        const request = testingController.expectOne('http://localhost:8080/example');
        request.flush({ name: 'user1' });

        expect(await response).toEqual({ name: 'user1' });
        expect(request.request.method).toEqual('PUT');
    });
});
