import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';

@Injectable({
    providedIn: 'root',
})
export class DmaHttpRequestService {
    private readonly baseURL = environment.baseBackEndURL;

    constructor(private httpClient: HttpClient) {}

    post<T>(endPoint: string, data?: unknown) {
        return this.httpClient.post<T>(this.baseURL + endPoint, data ?? null);
    }

    get<T>(endPoint: string) {
        return this.httpClient.get<T>(this.baseURL + endPoint);
    }

    delete(endPoint: string) {
        return this.httpClient.delete(this.baseURL + endPoint);
    }

    put(endPoint: string, data: unknown) {
        return this.httpClient.put(this.baseURL + endPoint, data);
    }
}
