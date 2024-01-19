import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, FactoryProvider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { clientIdHeaderInterceptor } from '../shared';
import { appRoutes } from './app.routes';
import { ConfigService } from './services/config.service';

const initializeConfigServiceProvider: FactoryProvider = {
    provide: APP_INITIALIZER,
    deps: [ConfigService],
    useFactory: (configService: ConfigService) => async () => await firstValueFrom(configService.initialize()),
    multi: true,
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([clientIdHeaderInterceptor])),
        initializeConfigServiceProvider,
    ],
};
