import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ValueProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom, Observable } from 'rxjs';
import { CLIENT_HOST } from '../../app/shared/http/consants';

const provideTestingClientHost = () =>
    ({
        provide: CLIENT_HOST,
        useValue: 'http://localhost:9876',
    }) as ValueProvider;

export function provideDnDMappTesting() {
    return [provideHttpClient(), provideTestingClientHost()];
}

export async function runInitializers() {
    const initializers = TestBed.inject(APP_INITIALIZER);

    await Promise.all(
        initializers.map((initializer) => {
            const init = initializer();

            if (init instanceof Promise) {
                return init;
            } else if (init instanceof Observable) {
                return lastValueFrom(init);
            }
            return Promise.resolve(init);
        })
    );
}
