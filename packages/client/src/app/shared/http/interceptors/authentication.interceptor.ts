import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ClassProvider, Injectable, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService, TOKEN_STORAGE_KEY } from '../../storage';

export const authenticationInterceptorProvider: ClassProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: forwardRef(() => AuthenticationInterceptor),
    multi: true,
};

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private readonly storageService: StorageService) {}

    intercept(request: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.storageService.getItem(TOKEN_STORAGE_KEY);

        if (token) {
            return handler.handle(this.addAuthentication(request, token));
        }
        return handler.handle(request);
    }

    private addAuthentication(request: HttpRequest<unknown>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
