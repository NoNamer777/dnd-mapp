import { Route } from '@angular/router';
import { authenticationGuard } from '../authentication/guards';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'characters',
        loadChildren: async () => (await import('../../character')).DmaCharacterModule,
        canActivate: [authenticationGuard()],
    },
    {
        path: 'login',
        loadComponent: async () => (await import('../authentication')).DmaLoginPage,
        canActivate: [authenticationGuard(true)],
    },
    {
        path: 'not-found',
        loadComponent: async () => (await import('../pages')).DmaNotFoundPage,
    },
    {
        path: 'sign-up',
        loadComponent: async () => (await import('../authentication')).DmaSignUpPage,
        canActivate: [authenticationGuard(true)],
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];
