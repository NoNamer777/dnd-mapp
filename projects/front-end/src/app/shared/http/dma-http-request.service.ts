import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { tap } from 'rxjs';
import { environment } from '../../../environments';

interface RequestOptions {
    withState: true;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

@Injectable({
    providedIn: 'root',
})
export class DmaHttpRequestService {
    private readonly baseURL = environment.baseBackEndURL;

    constructor(private httpClient: HttpClient) {}

    post<R, B = null>(endPoint: string, data: B, options?: RequestOptions) {
        return this.makeRequest<R, B>('POST', this.baseURL + endPoint, data, options);
    }

    get<R, B = null>(endPoint: string, options?: RequestOptions) {
        return this.makeRequest<R, B>('GET', this.baseURL + endPoint, null, options);
    }

    delete(endPoint: string) {
        return this.makeRequest('DELETE', this.baseURL + endPoint);
    }

    put<R, B>(endPoint: string, data: B) {
        return this.makeRequest<R, B>('PUT', this.baseURL + endPoint, data);
    }

    private makeRequest<R, B = null>(
        method: RequestMethod,
        url: string,
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
            return this.httpClient.request<R & { state: string }>(method, url, { body: body }).pipe(
                tap((response) => {
                    if (response.state !== state) {
                        throw new Error('State validation error');
                    }
                })
            );
        }
        return this.httpClient.request<R>(method, url, { body: body });
    }
}
