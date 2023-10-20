import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';

@Injectable({
    providedIn: 'root',
})
export class DmaHttpRequestService {
    private readonly baseURL = environment.baseBackEndURL;

    constructor(private httpClient: HttpClient) {}

    post<T>(endPoint: string, data: T) {
        return this.httpClient.post(this.baseURL + endPoint, data);
    }

    get(endPoint: string) {
        return this.httpClient.get(this.baseURL + endPoint);
    }

    delete(endPoint: string) {
        return this.httpClient.delete(this.baseURL + endPoint);
    }

    put<T>(endPoint: string, data: T) {
        return this.httpClient.put(this.baseURL + endPoint, data);
    }
}
