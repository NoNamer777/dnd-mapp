import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '/',
    },
    {
        path: '**',
        redirectTo: '/',
    },
];
