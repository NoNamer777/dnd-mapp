import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../app/core/services/config.service';
import { clientIdHeaderInterceptor } from '../../../app/shared';

@Injectable()
class ClientHeaderInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return clientIdHeaderInterceptor(request, next.handle);
    }
}

const CLIENT_HEADER_INTERCEPTOR_PROVIDER = {
    provide: HTTP_INTERCEPTORS,
    useClass: ClientHeaderInterceptor,
    deps: [ConfigService, HttpClient],
    multi: true,
};

export function provideDmaHttpTesting() {
    return [
        provideHttpClient(withInterceptorsFromDi()),
        ...provideHttpClientTesting(),
        CLIENT_HEADER_INTERCEPTOR_PROVIDER,
    ];
}
