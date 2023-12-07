import { Injectable, OnDestroy } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CLIENT_ID_STORAGE_KEY, DmaHttpRequestService, StorageService } from '../../shared';
import { ConfigModel, ConfigModelResponse } from './config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService implements OnDestroy {
    config: ConfigModel;

    private destroy$ = new Subject<void>();

    constructor(
        private requestService: DmaHttpRequestService,
        private storageService: StorageService
    ) {}

    initialize() {
        this.initializeConfigFromStorage();
        this.retrieveConfig();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    storeConfig() {
        if (!this.config?.clientId) return;

        this.storageService.setItem(CLIENT_ID_STORAGE_KEY, this.config.clientId);
    }

    private initializeConfigFromStorage() {
        const clientId = this.storageService.getItem(CLIENT_ID_STORAGE_KEY);

        if (clientId) {
            this.config = { clientId };
            this.storageService.removeItem(CLIENT_ID_STORAGE_KEY);
        }
    }

    private retrieveConfig() {
        let endPoint = '/api/client';

        this.requestService
            .post<ConfigModelResponse>(endPoint, {})
            .pipe(takeUntil(this.destroy$), take(1))
            .subscribe({
                next: (data) => {
                    this.config = { clientId: data.clientId };
                },
            });
    }
}
