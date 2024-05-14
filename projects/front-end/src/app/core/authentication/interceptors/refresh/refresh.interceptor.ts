import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BackEndError } from '@dnd-mapp/data';
import { Observable, catchError, switchMap } from 'rxjs';
import { AuthenticationService } from '../../services';

export function refreshInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const authenticationService = inject(AuthenticationService);

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
