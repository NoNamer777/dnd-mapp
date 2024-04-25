import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { defaultUser } from '@dnd-mapp/data/testing';
import { withInitializedConfig } from '@dnd-mapp/front-end/testing';
import { createId } from '@paralleldrive/cuid2';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';

describe('UserService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            providers: [withInitializedConfig(), provideHttpClient(), UserService],
        });

        return {
            service: TestBed.inject(UserService),
        };
    }

    it('should return a User by their ID', async () => {
        const { service } = setupTestEnvironment();
        const { id, username } = defaultUser;

        expect(await firstValueFrom(service.getById(id))).toEqual(jasmine.objectContaining({ id, username }));
    });

    it('should throw a 404 if a User was not found by ID', async () => {
        const { service } = setupTestEnvironment();

        await expectAsync(firstValueFrom(service.getById(createId()))).toBeRejected();
    });
});
