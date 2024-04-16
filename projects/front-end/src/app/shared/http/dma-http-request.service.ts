import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { map, switchMap, tap } from 'rxjs';
import { ConfigService } from '../config';

interface RequestOptions {
    withState: true;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

@Injectable({ providedIn: 'root' })
export class DmaHttpRequestService {
    private readonly configService = inject(ConfigService);

    private readonly httpClient = inject(HttpClient);

    post<R, B = null>(endPoint: string, data: B, options?: RequestOptions) {
        return this.makeRequest<R, B>('POST', endPoint, data, options);
    }

    get<R, B = null>(endPoint: string, options?: RequestOptions) {
        return this.makeRequest<R, B>('GET', endPoint, null, options);
    }

    delete(endPoint: string) {
        return this.makeRequest('DELETE', endPoint);
    }

    put<R, B>(endPoint: string, data: B) {
        return this.makeRequest<R, B>('PUT', endPoint, data);
    }

    private makeRequest<R, B = null>(
        method: RequestMethod,
        endPoint: string,
        body: B | (B & { state: string }) | { state: string } | null = null,
        options?: RequestOptions
    ) {
        if (options?.withState) {
            const state = nanoid();

            if (body) {
                body = { ...body, state: state };
            } else {
                body = { state: state };
            }
            return this.configService.config$.pipe(
                switchMap(({ baseBackEndURL }) =>
                    this.httpClient.request<{ state: string; data: R }>(method, baseBackEndURL + endPoint, {
                        body: body,
                    })
                ),
                tap((response) => {
                    if (!response || response.state !== state) {
                        throw new Error('State validation error');
                    }
                }),
                map((response) => response.data)
            );
        }
        return this.configService.config$.pipe(
            switchMap(({ baseBackEndURL }) =>
                this.httpClient.request<R>(method, baseBackEndURL + endPoint, { body: body })
            )
        );
    }
}
