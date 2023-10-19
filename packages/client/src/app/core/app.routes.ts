import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'authentication',
        loadChildren: async () => (await import('./authentication')).DmaAuthenticationModule,
    },
    {
        path: '',
    },
    {
        path: '**',
        redirectTo: '',
    },
];
