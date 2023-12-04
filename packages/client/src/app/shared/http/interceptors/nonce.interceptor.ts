import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { ClassProvider, Injectable, forwardRef } from '@angular/core';
import { nanoid } from 'nanoid';
import { Observable, tap } from 'rxjs';

export const nonceInterceptorProvider: ClassProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: forwardRef(() => NonceInterceptor),
    multi: true,
};

const noncePaths = ['/api/client', '/authentication/login'];

@Injectable()
export class NonceInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
        const { nonce: nonce, request: updatedRequest } = this.addNonce(request);

        return handler.handle(updatedRequest).pipe(
            tap((response) => {
                if (!(response instanceof HttpResponse)) return;

                if ((response as HttpResponse<{ nonce: string }>).body?.nonce !== nonce) {
                    throw new Error('Nonce validation failed');
                }
            })
        );
    }

    private addNonce(request: HttpRequest<unknown>) {
        if (this.shouldAddNonce(request.url)) {
            const nonce = nanoid();

            return { nonce: nonce, request: request.clone({ setParams: { nonce: nonce } }) };
        }
        return { nonce: null, request: request };
    }

    private shouldAddNonce(url: string) {
        return noncePaths.map((path) => url.includes(path)).some((pathIsIncluded) => pathIsIncluded);
    }
}
