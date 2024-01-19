import { HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../../../../core/services/config.service';

export function clientIdHeaderInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const configService = inject(ConfigService);

    const clientId = configService.clientId;

    if (!clientId) {
        return next(request);
    }
    const updatedRequest = request.clone({
        headers: new HttpHeaders({ 'Dma-Client-Id': clientId }),
    });

    return next(updatedRequest);
}
