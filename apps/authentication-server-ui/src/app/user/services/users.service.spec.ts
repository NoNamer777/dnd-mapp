import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { defaultUsers, mockUserDB } from '../../../testing/mocks/db';
import { UsersService } from './users.service';

describe('UsersService', () => {
    async function setupTest() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()],
        });

        return {
            usersService: TestBed.inject(UsersService),
        };
    }

    it('should get all Users', async () => {
        const { usersService } = await setupTest();
        expect((await lastValueFrom(usersService.getAll())).length).toEqual(3);
    });

    it('should delete a User by their ID', async () => {
        const { usersService } = await setupTest();

        expect((await lastValueFrom(usersService.getAll())).length).toEqual(3);
        expect(mockUserDB.getById(defaultUsers[1].id)).not.toBeNull();

        await lastValueFrom(usersService.delete(defaultUsers[1].id));

        expect(usersService.users()).toHaveSize(2);
        expect(usersService.users().some(({ id }) => id === defaultUsers[1].id)).toBeFalse();
        expect(mockUserDB.getById(defaultUsers[1].id)).toBeNull();
    });
});
