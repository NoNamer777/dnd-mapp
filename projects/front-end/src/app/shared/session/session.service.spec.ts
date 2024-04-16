import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StorageService } from '../../shared';
import { SessionService } from './session.service';

describe('SessionService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), SessionService],
        });

        return {
            sessionService: TestBed.inject(SessionService),
            storageService: TestBed.inject(StorageService),
        };
    }
});
