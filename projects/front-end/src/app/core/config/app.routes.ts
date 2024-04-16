import { Route } from '@angular/router';
import { authenticationGuard } from '../authentication/guards';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: async () => (await import('../authentication')).DmaLoginPage,
        canActivate: [authenticationGuard(true)],
    },
    {
        path: 'sign-up',
        loadComponent: async () => (await import('../authentication')).DmaSignUpPage,
        canActivate: [authenticationGuard(true)],
    },
];
