import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ClassProvider, Inject, Injectable, forwardRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { StorageService, TOKEN_STORAGE_KEY } from '../../storage';
import { JWT_HELPER_SERVICE } from '../../tokens';

export const authenticationInterceptorProvider: ClassProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: forwardRef(() => AuthenticationInterceptor),
    multi: true,
};

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private readonly storageService: StorageService,
        @Inject(JWT_HELPER_SERVICE) private readonly jwtHelperService: JwtHelperService
    ) {}

    intercept(request: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
        try {
            const token = this.storageService.getItem(TOKEN_STORAGE_KEY);
            const tokenIsValid = Boolean(this.jwtHelperService.decodeToken(token as string));

            if (token && tokenIsValid) {
                return handler.handle(this.addAuthentication(request, token));
            }
        } catch (error) {
            // Swallow token decoding errors
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
