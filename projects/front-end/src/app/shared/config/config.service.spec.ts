import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { baseBackEndURL, getMockServiceWorker } from '@dnd-mapp/front-end/testing';
import { HttpResponse, http } from 'msw';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
    function setupTest() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), ConfigService],
        });

        spyOn(console, 'error');

        return {
            service: TestBed.inject(ConfigService),
        };
    }

    it('should be able to fetch the config', async () => {
        const { service } = setupTest();

        await firstValueFrom(service.initialize());
        expect(await firstValueFrom(service.config$)).toEqual({ baseBackEndURL: baseBackEndURL });
    });

    it('should fallback to the default config value', async () => {
        getMockServiceWorker().use(http.get('assets/config/config.json', () => HttpResponse.error()));
        const { service } = setupTest();

        await firstValueFrom(service.initialize());
        expect(await firstValueFrom(service.config$)).toEqual({ baseBackEndURL: 'http://localhost:8080/server' });
    });
});
