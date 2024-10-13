import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { getMsw } from '@dnd-mapp/authentication-server-ui/testing';
import { http, HttpResponse } from 'msw';
import { lastValueFrom } from 'rxjs';
import { RequestService } from './request.service';

describe('RequestService', () => {
    function setupTest() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()],
        });

        return {
            service: TestBed.inject(RequestService),
        };
    }

    it('should send get request', async () => {
        getMsw().use(http.get('http://localhost:8080/end-point', () => Response.json({ attribute: 'value' })));

        const { service } = setupTest();

        const response = await lastValueFrom(service.get('http://localhost:8080/end-point'));
        expect(response).toEqual({ attribute: 'value' });
    });

    it('should return undefined when receiving error', async () => {
        getMsw().use(http.get('http://localhost:8080/end-point', () => new HttpResponse(null, { status: 500 })));

        const { service } = setupTest();

        const response = await lastValueFrom(service.get('http://localhost:8080/end-point'));
        expect(response).toBeUndefined();
    });
});
