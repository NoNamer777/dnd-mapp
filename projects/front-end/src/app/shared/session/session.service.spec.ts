import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TEST_INITIALIZER, withInitializedConfig } from '@dnd-mapp/front-end/testing';
import { firstValueFrom } from 'rxjs';
import { SessionService } from './session.service';

describe('SessionService', () => {
    async function setupTest() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), withInitializedConfig(), SessionService],
        });

        await TestBed.inject(TEST_INITIALIZER)();

        return {
            sessionService: TestBed.inject(SessionService),
        };
    }

    it('should initialize a new Session', async () => {
        const { sessionService } = await setupTest();

        expect(sessionService.session$.value).toBeNull();

        const session = await firstValueFrom(sessionService.retrieveSession());
        expect(sessionService.session$.value).toEqual(session);
    });
});
