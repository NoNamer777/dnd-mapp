import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../../../shared';

export function authorizationInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const sessionService = inject(SessionService);

    if (!sessionService.session$.value?.tokens) {
        return next(request);
    }
    const token = request.url.includes('token?grantType=refreshToken')
        ? sessionService.session$.value.tokens.refresh
        : sessionService.session$.value.tokens.access;

    const authorizedRequest = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    return next(authorizedRequest);
}
