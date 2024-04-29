import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    function setupTest() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), AuthenticationService],
        });

        return {
            service: TestBed.inject(AuthenticationService),
        };
    }

    it('should initialize', async () => {
        const { service } = setupTest();
        expect(service).toBeDefined();
    });
});
