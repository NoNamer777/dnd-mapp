import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTranslations } from '../../shared';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes), provideHttpClient(), provideAnimationsAsync(), provideTranslations()],
};
