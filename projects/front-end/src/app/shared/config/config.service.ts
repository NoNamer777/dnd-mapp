import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, ReplaySubject, tap } from 'rxjs';
import { Config, defaultConfig } from './models';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private readonly httpClient = inject(HttpClient);
    private readonly destroyRef = inject(DestroyRef);

    private readonly configSubject = new ReplaySubject<Config>(1);

    readonly config$ = this.configSubject.asObservable();

    initialize() {
        return this.httpClient.get<Config>('assets/config/config.json').pipe(
            catchError((error) => {
                console.error('Unable to read config file. Falling back to the default', error);
                return of(defaultConfig);
            }),
            tap((config) => {
                this.configSubject.next(config);
            }),
            takeUntilDestroyed(this.destroyRef)
        );
    }
}
