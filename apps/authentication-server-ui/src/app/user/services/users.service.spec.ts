import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
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

    it('should return all Users', async () => {
        const { usersService } = await setupTest();
        expect((await lastValueFrom(usersService.getAll())).length).toEqual(3);
    });
});
