import { provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection, ValueProvider } from '@angular/core';
import { CLIENT_HOST } from '../../app/shared/http/consants';

const provideTestingClientHost = () =>
    ({
        provide: CLIENT_HOST,
        useValue: 'http://localhost:5173',
    }) as ValueProvider;

export function provideDnDMappTesting() {
    return [provideExperimentalZonelessChangeDetection(), provideHttpClient(), provideTestingClientHost()];
}
