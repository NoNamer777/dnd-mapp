import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, lastValueFrom } from 'rxjs';

export function provideDnDMappTesting() {
    return [provideHttpClient()];
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
