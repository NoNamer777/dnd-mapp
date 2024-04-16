import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { catchError, of, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';
import { Config, defaultConfig } from './models';

@Injectable({ providedIn: 'root' })
export class ConfigService implements OnDestroy {
    private readonly httpClient = inject(HttpClient);

    private readonly configSubject = new ReplaySubject<Config>(1);

    readonly config$ = this.configSubject.asObservable();

    private readonly destroy$ = new Subject<void>();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initialize() {
        return this.httpClient.get<Config>('assets/config/config.json').pipe(
            catchError((error) => {
                console.error('Unable to read config file. Falling back to the default', error);
                return of(defaultConfig);
            }),
            tap((config) => this.configSubject.next(config)),
            takeUntil(this.destroy$)
        );
    }
}
