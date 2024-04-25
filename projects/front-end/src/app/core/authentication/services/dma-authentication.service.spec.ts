import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DmaAuthenticationService } from './dma-authentication.service';

describe('DmaAuthenticationService', () => {
    function setupTest() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), DmaAuthenticationService],
        });

        return {
            service: TestBed.inject(DmaAuthenticationService),
        };
    }

    it('should initialize', async () => {
        const { service } = setupTest();
        expect(service).toBeDefined();
    });
});
