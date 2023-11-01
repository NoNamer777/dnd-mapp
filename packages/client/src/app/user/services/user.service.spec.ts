import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments';
import { DmaHttpRequestTestingModule } from '../../../testing';
import { UserService } from './user.service';

fdescribe('UserService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [UserService],
        });

        return {
            service: TestBed.inject(UserService),
            testingController: TestBed.inject(HttpTestingController),
        };
    }

    afterEach(() => TestBed.inject(HttpTestingController).verify());

    it('should return a User by their ID', async () => {
        const { service, testingController } = setupTestEnvironment();

        const response = firstValueFrom(service.getById(1));
        const request = testingController.expectOne(`${environment.baseBackEndURL}/api/user/1`);

        request.flush({ id: 1, username: 'User1', roles: [{ id: 1, name: 'Player' }] });
        expect(await response).toEqual(jasmine.objectContaining({ id: 1 }));
    });

    it('should throw a 404 if a User was not found by ID', async () => {
        const { service, testingController } = setupTestEnvironment();

        const response = firstValueFrom(service.getById(1));
        const request = testingController.expectOne(`${environment.baseBackEndURL}/api/user/1`);

        request.flush({ message: `The User with ID: '1' was not found` }, { status: 404, statusText: 'Not Found' });

        await expectAsync(response).toBeRejected();
    });
});
