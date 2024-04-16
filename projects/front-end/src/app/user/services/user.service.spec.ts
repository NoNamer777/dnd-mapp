import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';

describe('UserService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), UserService],
        });

        return {
            service: TestBed.inject(UserService),
        };
    }

    it('should return a User by their ID', async () => {
        const { service } = setupTestEnvironment();

        expect(await firstValueFrom(service.getById(1))).toEqual(jasmine.objectContaining({ id: 1 }));
    });

    it('should throw a 404 if a User was not found by ID', async () => {
        const { service } = setupTestEnvironment();

        await expectAsync(firstValueFrom(service.getById(2))).toBeRejected();
    });
});
