import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, FactoryProvider } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ConfigService, SessionService, backEndErrorInterceptor } from '../../shared';
import { DmaAuthenticationService, authorizationInterceptor, refreshInterceptor } from '../authentication';
import { appRoutes } from './app.routes';

const initializeConfigServiceProvider: FactoryProvider = {
    provide: APP_INITIALIZER,
    deps: [ConfigService, SessionService, DmaAuthenticationService],
    useFactory:
        (
            configService: ConfigService,
            sessionService: SessionService,
            authenticationService: DmaAuthenticationService
        ) =>
        async () => {
            await firstValueFrom(configService.initialize());

            const session = await firstValueFrom(sessionService.retrieveSession$);

            if (session.tokens) {
                await firstValueFrom(authenticationService.initialize(session.tokens.access as string));
            }
        },
    multi: true,
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([refreshInterceptor, authorizationInterceptor, backEndErrorInterceptor])),
        initializeConfigServiceProvider,
    ],
};
