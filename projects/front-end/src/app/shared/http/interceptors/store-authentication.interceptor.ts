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
import { StorageKey, StorageService } from '../../storage';
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

                this.processAuthorizationHeader(header.replace('Bearer ', '').trim());
            })
        );
    }

    private processAuthorizationHeader(token: string) {
        if (token.length === 0) return;

        try {
            // Make sure the token is valid before storing it
            this.jwtHelperService.decodeToken(token);

            this.localStorageService.setItem(StorageKey.ACCESS_TOKEN, token);
        } catch (error) {
            // Swallow errors produced by decoding the token
        }
    }
}
