import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            providers: [ConfigService],
        });

        return {
            service: TestBed.inject(ConfigService),
        };
    }

    it('should ', () => {
        const { service } = setupTestEnvironment();
    });
});
