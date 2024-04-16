import { InjectionToken } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const JWT_HELPER_SERVICE = new InjectionToken('JwtHelperService', {
    providedIn: 'root',
    factory: () => new JwtHelperService(),
});
