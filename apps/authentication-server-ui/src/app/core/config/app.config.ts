import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslations } from '../../shared';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes), provideHttpClient(), provideTranslations()],
};
