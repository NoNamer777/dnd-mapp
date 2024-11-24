import { ValueProvider } from '@angular/core';
import { RXJS_CONFIG, RxjsConfig } from '../../app/rxjs';

export const provideRxjsTestingConfig: () => ValueProvider = () => ({
    provide: RXJS_CONFIG,
    useValue: {
        delays: {
            tooltip: {
                show: 0,
                hide: 0,
            },
        },
    } as RxjsConfig,
});
