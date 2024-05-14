import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { BackEndError } from '@dnd-mapp/data';
import { plainToInstance } from 'class-transformer';
import { Observable, catchError } from 'rxjs';

export function backEndErrorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    return next(request).pipe(
        catchError((error) => {
            if (error.error instanceof ProgressEvent) {
                throw plainToInstance(BackEndError, {
                    status: error.status,
                    message: error.message,
                    timestamp: new Date(),
                });
            }
            throw plainToInstance(BackEndError, error.error);
        })
    ) as Observable<HttpEvent<unknown>>;
}
