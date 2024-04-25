import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { BackEndError } from '@dnd-mapp/data';
import { plainToInstance } from 'class-transformer';
import { Observable, catchError } from 'rxjs';

export function backEndErrorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    return next(request).pipe(
        catchError((error) => {
            if (error.error) throw plainToInstance(BackEndError, error.error);
            throw error;
        })
    ) as Observable<HttpEvent<unknown>>;
}
