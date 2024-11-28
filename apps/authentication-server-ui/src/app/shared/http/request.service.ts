import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, of, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService {
    private readonly httpClient = inject(HttpClient);

    // TODO: Add retry + error handling
    public get<T>(url: string) {
        return this.httpClient.get<T>(url).pipe(
            shareReplay({ bufferSize: 1, refCount: true }),
            catchError((_error: HttpErrorResponse) => of(undefined))
        );
    }

    // TODO: Add retry + error handling
    public delete(url: string) {
        return this.httpClient.delete(url).pipe(catchError((_error: HttpErrorResponse) => of(undefined)));
    }
}
