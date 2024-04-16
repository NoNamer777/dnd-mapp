import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { plainToInstance } from 'class-transformer';
import { Observable, catchError, of } from 'rxjs';
import { BackEndError } from '../models';

export function backEndErrorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    return next(request).pipe(
        catchError((error) => {
            if (error.error) throw plainToInstance(BackEndError, error.error);
            return of(error);
        })
    ) as Observable<HttpEvent<unknown>>;
}
