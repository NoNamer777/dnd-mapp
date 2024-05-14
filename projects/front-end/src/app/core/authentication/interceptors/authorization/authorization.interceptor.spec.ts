import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
    TEST_INITIALIZER,
    baseBackEndURL,
    getMockServiceWorker,
    withAuthorizedSession,
    withInitializedConfig,
} from '@dnd-mapp/front-end/testing';
import { HttpResponse, http } from 'msw';
import { firstValueFrom } from 'rxjs';
import { HttpRequestService } from '../../../../shared';
import { authorizationInterceptor } from './authorization.interceptor';

describe('AuthorizationInterceptor', () => {
    async function setupTest(params?: { withAuthorizedSession: boolean }) {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([authorizationInterceptor])),
                ...(params?.withAuthorizedSession ? [withAuthorizedSession()] : [withInitializedConfig()]),
            ],
        });

        await TestBed.inject(TEST_INITIALIZER)();

        return {
            requestService: TestBed.inject(HttpRequestService),
        };
    }

    it('should not add the authorization header when no tokens are present', async () => {
        getMockServiceWorker().use(
            http.post(`${baseBackEndURL}/example`, ({ request }) => {
                expect(request.headers.has('Authorization')).toBeFalse();

                return HttpResponse.json();
            })
        );

        const { requestService } = await setupTest();

        await firstValueFrom(requestService.post('/example', null));
    });

    it('should add the access token in the authorization header when tokens are present', async () => {
        getMockServiceWorker().use(
            http.post(`${baseBackEndURL}/example`, ({ request }) => {
                expect(request.headers.has('Authorization')).toBeTrue();
                expect(request.headers.get('Authorization')).toEqual('Bearer Access token');

                return HttpResponse.json();
            })
        );

        const { requestService } = await setupTest({ withAuthorizedSession: true });

        await firstValueFrom(requestService.post('/example', null));
    });

    it('should add the refresh token in the authorization header on specific end-points', async () => {
        getMockServiceWorker().use(
            http.post(`${baseBackEndURL}/authentication/token`, ({ request }) => {
                const token = request.headers.get('Authorization').replace('Bearer ', '');
                const grantType = request.url.split('?')[1].split('&')[0].split('=')[1];

                expect(grantType).toEqual('refreshToken');
                expect(token).toEqual('Refresh token');

                return HttpResponse.json();
            })
        );

        const { requestService } = await setupTest({ withAuthorizedSession: true });

        await firstValueFrom(requestService.post('/authentication/token?grantType=refreshToken', null));
    });
});
