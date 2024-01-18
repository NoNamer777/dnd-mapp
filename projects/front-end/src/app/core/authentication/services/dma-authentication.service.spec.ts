import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { defaultUser } from '@dnd-mapp/data/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments';
import { DmaHttpRequestTestingModule } from '../../../../testing';
import { TextCodingService } from '../../../shared';
import { ConfigService } from '../../services/config.service';
import { DmaAuthenticationService } from './dma-authentication.service';

describe('DmaAuthenticationService', () => {
    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [DmaAuthenticationService, TextCodingService, ConfigService],
        });

        // TODO: Remove after back-end authentication has been implemented
        spyOn(console, 'warn');

        const testingController = TestBed.inject(HttpTestingController);
        const authenticationService = TestBed.inject(DmaAuthenticationService);

        await initializeConfigService(testingController);

        return {
            authenticationService: authenticationService,
            testingController: testingController,
        };
    }

    async function initializeConfigService(testingController: HttpTestingController) {
        const configService = TestBed.inject(ConfigService);

        const configInit = firstValueFrom(configService.initialize());
        const request = testingController.expectOne(environment.baseBackEndURL + '/api/client');
        request.flush({ id: 'client_id', state: request.request.body.state });

        await configInit;
    }

    // Need to wait until Web Crypto has finished the digest of the code verifier.
    async function waitForCrypto() {
        await new Promise<void>((resolve) => {
            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                resolve();
            }, 1);
        });
    }

    afterEach(() => TestBed.inject(HttpTestingController).verify());

    // TODO: Enable after back-end authentication has been implemented
    xit('should not initialize an authenticated User when no User data is returned based on the presented cookies', async () => {
        const { authenticationService, testingController } = await setupTestEnvironment();

        const request = testingController.expectOne(environment.baseBackEndURL + '/authentication/user');
        request.flush({ statusCode: 401, error: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

        expect(authenticationService.authenticatedUser$.value).toBeNull();
    });

    // TODO: Enable after back-end authentication has been implemented
    xit('should initialize an authenticated User when User data is returned based on the presented cookies', async () => {
        const { authenticationService, testingController } = await setupTestEnvironment();

        const request = testingController.expectOne(environment.baseBackEndURL + '/authentication/user');
        request.flush({ ...defaultUser });

        expect(authenticationService.authenticatedUser$.value).toEqual(defaultUser);
    });

    it('should process an sign-up request', async () => {
        const { authenticationService, testingController } = await setupTestEnvironment();
        const userData = { username: 'User2', password: 'secure_password', emailAddress: 'user2@domain.com' };

        const signUp = firstValueFrom(authenticationService.signUp(userData));

        const response = testingController.expectOne(environment.baseBackEndURL + '/authentication/sign-up');

        expect(response.request.body).toEqual(userData);
        expect(response.request.method).toEqual('POST');

        response.flush(null);

        await expectAsync(signUp).toBeResolved();
    });

    it('should be processing login requests without throwing errors.', async () => {
        const { authenticationService, testingController } = await setupTestEnvironment();
        const { username, password } = defaultUser;

        const login = firstValueFrom(authenticationService.login(username, password));

        await waitForCrypto();

        // Check if the code challenge and verifier have been generated and the code challenge has been sent to the back-end
        const challengeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/challenge');

        expect(challengeRequest.request.body).toEqual(jasmine.objectContaining({ codeChallenge: jasmine.any(String) }));
        challengeRequest.flush({ state: challengeRequest.request.body.state });

        // Determine that the provided credentials are valid
        const loginRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/login');
        expect(loginRequest.request.body).toEqual({ username: username, password: password });

        loginRequest.flush(null);

        // Retrieve an authorization code
        const authorizeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/authorize');
        authorizeRequest.flush({ state: authorizeRequest.request.body.state, authorizationCode: 'authorization_code' });

        // Retrieve the access- and refresh tokens with the authorization code and code verifier
        const tokenRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/token');

        expect(tokenRequest.request.body).toEqual(
            jasmine.objectContaining({
                codeVerifier: jasmine.any(String),
                authorizationCode: 'authorization_code',
                clientId: 'client_id',
            })
        );

        tokenRequest.flush(null);

        await expectAsync(login).toBeResolved();
    });

    it('should throw errors when an error response is returned when registering a User', async () => {
        const { authenticationService, testingController } = await setupTestEnvironment();
        const userData = { username: 'User2', password: 'secure_password', emailAddress: 'user2@domain.com' };

        const signUp = firstValueFrom(authenticationService.signUp(userData));

        const response = testingController.expectOne(environment.baseBackEndURL + '/authentication/sign-up');

        expect(response.request.body).toEqual(userData);
        expect(response.request.method).toEqual('POST');

        response.flush(
            { statusCode: 400, error: 'Bad Request', message: 'Username is not available' },
            { status: 400, statusText: 'Bad Request' }
        );

        await expectAsync(signUp).toBeRejectedWith(
            new HttpErrorResponse({
                url: environment.baseBackEndURL + '/authentication/sign-up',
                status: 400,
                statusText: 'Bad Request',
                error: { statusCode: 400, error: 'Bad Request', message: 'Username is not available' },
            })
        );
    });

    it('should not proceed with logging in when sending the code challenge did not succeed', async () => {
        const { authenticationService, testingController } = await setupTestEnvironment();
        const { username, password } = defaultUser;

        const login = firstValueFrom(authenticationService.login(username, password));

        await waitForCrypto();

        // Check if the code challenge and verifier have been generated and the code challenge has been sent to the back-end
        const challengeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/challenge');
        challengeRequest.flush(null);

        await expectAsync(login).toBeRejectedWithError('State validation error');
    });

    it('should not proceed with logging in when the User provided invalid credentials', async () => {
        const { authenticationService, testingController } = await setupTestEnvironment();
        const { username } = defaultUser;

        const login = firstValueFrom(authenticationService.login(username, 'fake_password'));

        await waitForCrypto();

        // Check if the code challenge and verifier have been generated and the code challenge has been sent to the back-end
        const challengeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/challenge');
        challengeRequest.flush({ state: challengeRequest.request.body.state });

        // Determine that the provided credentials are valid
        const loginRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/login');
        loginRequest.flush(
            { statusCode: 400, error: 'Bad Request', message: 'Invalid credentials' },
            { status: 400, statusText: 'Bad Request' }
        );

        await expectAsync(login).toBeRejectedWith(
            new HttpErrorResponse({
                url: environment.baseBackEndURL + '/authentication/login',
                error: { message: 'Invalid credentials', statusCode: 400, error: 'Bad Request' },
                statusText: 'Bad Request',
                status: 400,
            })
        );
    });

    it('should not proceed with logging in when retrieving the authorization code fails', async () => {
        const { authenticationService, testingController } = await setupTestEnvironment();
        const { username, password } = defaultUser;

        const login = firstValueFrom(authenticationService.login(username, password));

        await waitForCrypto();

        // Check if the code challenge and verifier have been generated and the code challenge has been sent to the back-end
        const challengeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/challenge');
        challengeRequest.flush({ state: challengeRequest.request.body.state });

        // Determine that the provided credentials are valid
        const loginRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/login');
        loginRequest.flush(null);

        // Retrieve an authorization code
        const authorizeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/authorize');
        authorizeRequest.flush({ authorizationCode: 'authorization_code' });

        await expectAsync(login).toBeRejectedWithError('State validation error');
    });

    it('should not proceed with logging in when the code challenge verification fails', async () => {
        const { authenticationService, testingController } = await setupTestEnvironment();
        const { username, password } = defaultUser;

        const login = firstValueFrom(authenticationService.login(username, password));

        await waitForCrypto();

        // Check if the code challenge and verifier have been generated and the code challenge has been sent to the back-end
        const challengeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/challenge');

        expect(challengeRequest.request.body).toEqual(jasmine.objectContaining({ codeChallenge: jasmine.any(String) }));
        challengeRequest.flush({ state: challengeRequest.request.body.state });

        // Determine that the provided credentials are valid
        const loginRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/login');
        expect(loginRequest.request.body).toEqual({ username: username, password: password });

        loginRequest.flush(null);

        // Retrieve an authorization code
        const authorizeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/authorize');
        authorizeRequest.flush({ state: authorizeRequest.request.body.state, authorizationCode: 'authorization_code' });

        // Retrieve the access- and refresh tokens with the authorization code and code verifier
        const tokenRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/token');

        tokenRequest.flush(
            { error: 'Bad Request', statusCode: 400, message: 'The provided code verifier is invalid' },
            { status: 400, statusText: 'Bad Request' }
        );

        await expectAsync(login).toBeRejectedWith(
            new HttpErrorResponse({
                url: environment.baseBackEndURL + '/authentication/token',
                error: { message: 'The provided code verifier is invalid', statusCode: 400, error: 'Bad Request' },
                statusText: 'Bad Request',
                status: 400,
            })
        );
    });
});
