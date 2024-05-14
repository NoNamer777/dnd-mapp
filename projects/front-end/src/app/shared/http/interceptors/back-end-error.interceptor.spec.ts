import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BackEndError } from '@dnd-mapp/data';
import { baseBackEndURL, getMockServiceWorker } from '@dnd-mapp/front-end/testing';
import { HttpResponse, http } from 'msw';
import { firstValueFrom } from 'rxjs';
import { errorResponse } from '../../../../../testing/src/mocks/back-end/handlers/error';
import { backEndErrorInterceptor } from './back-end-error.interceptor';

describe('BackEndErrorInterceptor', () => {
    function setupTest() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(withInterceptors([backEndErrorInterceptor]))],
        });

        return {
            httpClient: TestBed.inject(HttpClient),
        };
    }

    it('should transform an error response from the back-end', async () => {
        getMockServiceWorker().use(
            http.get(`${baseBackEndURL}/example`, () => {
                throw errorResponse(500, 'Internal Server Error', 'Something unexpected went wrong.');
            })
        );

        const { httpClient } = setupTest();

        await expectAsync(firstValueFrom(httpClient.get(`${baseBackEndURL}/example`))).toBeRejectedWith(
            jasmine.any(BackEndError)
        );
    });

    it('should transform a network error response', async () => {
        getMockServiceWorker().use(http.get(`${baseBackEndURL}/example`, () => HttpResponse.error()));

        const { httpClient } = setupTest();

        await expectAsync(firstValueFrom(httpClient.get(`${baseBackEndURL}/example`))).toBeRejectedWith(
            jasmine.any(BackEndError)
        );
    });
});
