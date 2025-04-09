import { InjectionToken } from '@angular/core';

export const CLIENT_HOST = new InjectionToken<string>('client host address', {
    providedIn: 'root',
    factory: () => 'https://localhost.dndmapp.net',
});
