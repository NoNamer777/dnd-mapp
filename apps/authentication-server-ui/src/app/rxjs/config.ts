import { InjectionToken } from '@angular/core';

export interface RxjsConfig {
    delays: {
        tooltip: {
            show: number;
            hide: number;
        };
    };
}

const defaultRxjsConfig: RxjsConfig = {
    delays: {
        tooltip: {
            show: 500,
            hide: 200,
        },
    },
};

export const RXJS_CONFIG = new InjectionToken('Rxjs delays config', {
    providedIn: 'root',
    factory: () => defaultRxjsConfig,
});
