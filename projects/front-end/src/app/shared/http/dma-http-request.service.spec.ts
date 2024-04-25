import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { baseBackEndURL, getMockServiceWorker, withInitializedConfig } from '@dnd-mapp/front-end/testing';
import { HttpResponse, http } from 'msw';
import { PathParams } from 'msw/lib/core/utils/matching/matchRequestUrl';
import { firstValueFrom } from 'rxjs';
import { DmaHttpRequestService } from './dma-http-request.service';

describe('DmaHttpRequestService', () => {
    function setupTest() {
        TestBed.configureTestingModule({
            providers: [withInitializedConfig(), provideHttpClient()],
        });

        return {
            service: TestBed.inject(DmaHttpRequestService),
        };
    }

    it('should send a GET request', async () => {
        getMockServiceWorker().use(http.get(`${baseBackEndURL}/example`, () => HttpResponse.json({ example: 'hi' })));
        const { service } = setupTest();

        expect(await firstValueFrom(service.get('/example'))).toEqual({ example: 'hi' });
    });

    it('should send an request with a state in the body', async () => {
        getMockServiceWorker().use(
            http.post<PathParams, { state: string }>(`${baseBackEndURL}/example`, async ({ request }) => {
                const { state } = await request.json();
                return HttpResponse.json({ data: { attribute: true }, state: state });
            })
        );
        const { service } = setupTest();

        expect(await firstValueFrom(service.post('/example', { attribute2: false }, { withState: true }))).toEqual(
            jasmine.objectContaining({ attribute: true })
        );
    });

    it('should throw an error when state is not returned response', async () => {
        getMockServiceWorker().use(http.get(`${baseBackEndURL}/example`, () => HttpResponse.json({ attribute: true })));
        const { service } = setupTest();

        await expectAsync(firstValueFrom(service.get('/example', { withState: true }))).toBeRejectedWithError(
            'State validation error'
        );
    });

    it('should send a POST request', async () => {
        getMockServiceWorker().use(http.post(`${baseBackEndURL}/example`, () => HttpResponse.json({ name: 'user1' })));
        const { service } = setupTest();

        expect(await firstValueFrom(service.post('/example', { name: 'user' }))).toEqual({ name: 'user1' });
    });

    it('should send a DELETE request', async () => {
        getMockServiceWorker().use(http.delete(`${baseBackEndURL}/example`, () => HttpResponse.json(null)));
        const { service } = setupTest();

        await expectAsync(firstValueFrom(service.delete('/example'))).not.toBeRejected();
    });

    it('should send a PUT request', async () => {
        getMockServiceWorker().use(http.put(`${baseBackEndURL}/example`, () => HttpResponse.json({ name: 'user1' })));
        const { service } = setupTest();

        expect(await firstValueFrom(service.put('/example', { name: 'user1' }))).toEqual({ name: 'user1' });
    });
});
