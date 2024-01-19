import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, tap } from 'rxjs';
import { DmaHttpRequestService, StorageKey, StorageService } from '../../shared';
import { ConfigModel } from './config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private readonly config = new BehaviorSubject<ConfigModel | null>(null);

    config$ = this.config.pipe(
        filter((config) => Boolean(config)),
        map((config) => config!)
    );

    constructor(
        private requestService: DmaHttpRequestService,
        private storageService: StorageService
    ) {}

    initialize() {
        this.initializeConfigFromStorage();
        return this.retrieveConfig();
    }

    storeConfig() {
        if (!this.config.value) return;

        this.storageService.setItem(StorageKey.CLIENT_ID, this.config.value.id);
    }

    private initializeConfigFromStorage() {
        const clientId = this.storageService.getItem(StorageKey.CLIENT_ID);

        if (clientId) {
            this.config.next({ id: clientId });
            this.storageService.removeItem(StorageKey.CLIENT_ID);
        }
    }

    private initializeNewClient() {
        return this.requestService.post<ConfigModel>('/api/client', null, { withState: true }).pipe(
            tap((data) => this.config.next({ id: data.id })),
            catchError((error) => {
                console.error('Something unexepected went wrong whilen trying to create a new client configuration');
                throw error;
            })
        );
    }

    private retrieveConfig() {
        const clientId = this.config.value?.id;

        if (!clientId) {
            return this.initializeNewClient();
        }
        return this.requestService
            .post<ConfigModel>(`/api/client/${encodeURIComponent(clientId)}`, null, { withState: true })
            .pipe(
                tap((data) => this.config.next({ id: data.id })),
                catchError((error) => {
                    if (error.error.statusCode === 404) {
                        return this.initializeNewClient();
                    }
                    throw error;
                })
            );
    }
}
