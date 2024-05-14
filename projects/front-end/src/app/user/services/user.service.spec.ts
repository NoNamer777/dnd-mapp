import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { defaultUser } from '@dnd-mapp/data/testing';
import { TEST_INITIALIZER, withInitializedConfig } from '@dnd-mapp/front-end/testing';
import { createId } from '@paralleldrive/cuid2';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';

describe('UserService', () => {
    async function setupTest() {
        TestBed.configureTestingModule({
            providers: [withInitializedConfig(), provideHttpClient(), UserService],
        });

        await TestBed.inject(TEST_INITIALIZER)();

        return {
            service: TestBed.inject(UserService),
        };
    }

    it('should return a User by their ID', async () => {
        const { service } = await setupTest();
        const { id, username } = defaultUser;

        expect(await firstValueFrom(service.getById(id))).toEqual(jasmine.objectContaining({ id, username }));
    });

    it('should throw a 404 if a User was not found by ID', async () => {
        const { service } = await setupTest();

        await expectAsync(firstValueFrom(service.getById(createId()))).toBeRejected();
    });
});
