import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        loadComponent: async () => (await import('../home/home.page')).HomePage,
    },
    {
        path: 'not-found',
        loadComponent: async () => (await import('../not-found/not-found.page')).NotFoundPage,
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];
