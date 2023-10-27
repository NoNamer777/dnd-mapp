import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments';
import { DmaHttpRequestTestingModule } from '../../../../testing';
import { DmaAuthenticationService } from './dma-authentication.service';

describe('DmaAuthenticationService', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
        });

        return {
            authenticationService: TestBed.inject(DmaAuthenticationService),
            testController: TestBed.inject(HttpTestingController),
        };
    }

    afterEach(() => {
        TestBed.inject(HttpTestingController).verify();
    });

    it('should be processing log in requests without throwing errors.', async () => {
        const { authenticationService, testController } = setupTestEnvironment();

        const response = firstValueFrom(authenticationService.login('user1', 'secure_password'));
        const request = testController.expectOne(environment.baseBackEndURL + '/authentication/login');

        request.flush(null, {
            status: 200,
            statusText: 'success',
            headers: {
                Authorization: 'Bearer token',
            },
        });

        expect(async () => await response).not.toThrow();
    });

    it('should throw errors when processing httpErrorResponses', async () => {
        const { authenticationService, testController } = setupTestEnvironment();

        const response = firstValueFrom(authenticationService.login('user1', 'secure_password'));
        const request = testController.expectOne(environment.baseBackEndURL + '/authentication/login');

        request.flush(null, {
            status: 500,
            statusText: 'internal server error',
        });

        await expectAsync(response).toBeRejected();
    });
});
