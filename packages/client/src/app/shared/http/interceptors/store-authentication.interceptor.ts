import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { ClassProvider, Inject, Injectable, forwardRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { StorageService, TOKEN_STORAGE_KEY } from '../../storage';
import { JWT_HELPER_SERVICE } from '../../tokens';

export const storeAuthenticationInterceptorProvider: ClassProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: forwardRef(() => StoreAuthenticationInterceptor),
    multi: true,
};

@Injectable()
export class StoreAuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private readonly localStorageService: StorageService,
        @Inject(JWT_HELPER_SERVICE) private readonly jwtHelperService: JwtHelperService
    ) {}

    intercept(request: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
        return handler.handle(request).pipe(
            tap((httpEvent) => {
                if (httpEvent.type !== HttpEventType.Response) return;

                const response = httpEvent as HttpResponse<unknown>;
                const header = response.headers.get('Authorization');

                if (!header) return;

                this.processAuthorizationHeader(header);
            })
        );
    }

    private processAuthorizationHeader(header: string) {
        const token = header.replace('Bearer ', '').trim();

        if (token.length === 0) {
            throw new Error('No token was found in the Authorization header');
        }
        try {
            // Make sure the token is valid before storing it
            this.jwtHelperService.decodeToken(token);

            this.localStorageService.setItem(TOKEN_STORAGE_KEY, token);
        } catch (error) {
            // Swallow errors produced by decoding the token
        }
    }
}
