import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { mockSessionDB } from '@dnd-mapp/data/testing';
import { withInitializedConfig } from '@dnd-mapp/front-end/testing';
import { firstValueFrom } from 'rxjs';
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
});
