import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from '../services';

export function authenticationGuard(skipWhenAuthenticated = false) {
    return (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> => {
        const authenticationService = inject(AuthenticationService);
        const router = inject(Router);

        return authenticationService.authenticatedUser$.pipe(
            map(Boolean),
            map((isAuthenticated) => {
                if ((!skipWhenAuthenticated && isAuthenticated) || (!isAuthenticated && skipWhenAuthenticated)) {
                    return true;
                }
                return !isAuthenticated
                    ? router.parseUrl(`/login?redirectTo=${state.url}`)
                    : router.parseUrl('/characters');
            })
        );
    };
}
