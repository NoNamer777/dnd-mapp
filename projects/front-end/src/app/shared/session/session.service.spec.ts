import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { withInitializedConfig } from '@dnd-mapp/front-end/testing';
import { SessionService } from './session.service';

describe('SessionService', () => {
    function setupTest() {
        TestBed.configureTestingModule({
            providers: [withInitializedConfig(), provideHttpClient(), SessionService],
        });

        return {
            sessionService: TestBed.inject(SessionService),
        };
    }

    it('should initialize', async () => {
        const { sessionService } = setupTest();
        expect(sessionService).toBeDefined();
    });
});
