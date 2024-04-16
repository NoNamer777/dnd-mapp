import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, switchMap } from 'rxjs';
import { BackEndError } from '../../../shared';
import { DmaAuthenticationService } from '../services';

export function refreshInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const authenticationService = inject(DmaAuthenticationService);

    return next(request).pipe(
        catchError((error) => {
            if (!(error instanceof BackEndError)) return error;

            if (error.status === 401 && error.message.includes('expired')) {
                return authenticationService.token(true).pipe(switchMap(() => next(request)));
            }
            throw error;
        })
    ) as Observable<HttpEvent<unknown>>;
}
