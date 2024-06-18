import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from './authentication.service';

fdescribe('AuthenticationService', () => {
    function setupTest() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), AuthenticationService],
        });

        return {
            service: TestBed.inject(AuthenticationService),
        };
    }

    it('should initialize with no User authenticated', async () => {
        const { service } = setupTest();

        await firstValueFrom(service.initialize(null));

        expect(service.authenticatedUser$.value).toBeNull();
    });
});
