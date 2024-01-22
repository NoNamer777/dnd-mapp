import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { defaultUser } from '@dnd-mapp/data/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments';
import { DmaLoginHarness, provideDmaHttpTesting } from '../../../../../testing';
import { TextCodingService } from '../../../../shared';
import { ConfigService } from '../../../services/config.service';
import { DmaLoginPage } from './dma-login.page';

describe('DmaLoginComponent', () => {
    @Component({
        template: '<dma-login></dma-login>',
    })
    class TestComponent {}

    async function initializeTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaLoginPage, RouterTestingModule],
            providers: [provideDmaHttpTesting()],
            declarations: [TestComponent],
        });

        // The Web Crypto API is only available in a secure environment (HTTPS). Since the tests don't run
        // in such an environment, we need to fake the returned value for now.
        spyOn(crypto.subtle, 'digest').and.resolveTo(
            TestBed.inject(TextCodingService).encode('mock_code_challenge').buffer
        );

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));
        const testingController = TestBed.inject(HttpTestingController);

        await initializeConfigService(testingController);

        return {
            harness: await harnessLoader.getHarness(DmaLoginHarness),
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

    async function waitForLoginRequest(testingController: HttpTestingController) {
        tick(3);

        // Check if the code challenge and verifier have been generated and the code challenge has been sent to the back-end
        const challengeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/challenge');
        challengeRequest.flush({ state: challengeRequest.request.body.state });

        // Determine that the provided credentials are valid
        return testingController.expectOne(environment.baseBackEndURL + '/authentication/login');
    }

    afterEach(() => TestBed.inject(HttpTestingController).verify());

    it('should have disabled submit button with empty form', async () => {
        const { harness } = await initializeTestEnvironment();

        expect(await harness.isLoginButtonDisabled()).toBeTrue();
    });

    it('should be able to submit form and succeed', async () => {
        const { harness, testingController } = await initializeTestEnvironment();
        const { username, password } = defaultUser;

        await harness.inputUsername(username);
        await harness.inputPassword(password);

        expect(await harness.isLoginButtonDisabled()).toBeFalse();

        await harness.clickLoginButton();

        // Need to wait until Web Crypto has finished the digest of the code verifier.
        await new Promise<void>((resolve) => {
            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                resolve();
            }, 1);
        });

        // Check if the code challenge and verifier have been generated and the code challenge has been sent to the back-end
        const challengeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/challenge');
        challengeRequest.flush({ state: challengeRequest.request.body.state });

        // Determine that the provided credentials are valid
        const loginRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/login');
        loginRequest.flush(null);

        // Retrieve an authorization code
        const authorizeRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/authorize');
        authorizeRequest.flush({ state: authorizeRequest.request.body.state, authorizationCode: 'authorization_code' });

        // Retrieve the access- and refresh tokens with the authorization code and code verifier
        const tokenRequest = testingController.expectOne(environment.baseBackEndURL + '/authentication/token');
        tokenRequest.flush(null);

        expect(await harness.hasSuccessMessage()).toBeTrue();
        expect(await harness.getSuccessMessage()).toEqual('Login successful');
    });

    it('should be able to handle invalid credentials error responses', fakeAsync(async () => {
        const { harness, testingController } = await initializeTestEnvironment();
        const { username } = defaultUser;

        await harness.inputUsername(username);
        await harness.inputPassword('fake_password');

        await harness.clickLoginButton();

        const loginRequest = await waitForLoginRequest(testingController);
        loginRequest.flush(
            { statusCode: 400, error: 'Bad Request', message: 'Invalid credentials' },
            { status: 400, statusText: 'Bad Request' }
        );

        expect(await harness.hasErrorMessage()).toBeTrue();
        expect(await harness.getErrorMessage()).toEqual('Invalid username/password');
    }));

    it('should be able to handle client or server error responses', fakeAsync(async () => {
        const { harness, testingController } = await initializeTestEnvironment();
        const { username, password } = defaultUser;

        await harness.inputUsername(username);
        await harness.inputPassword(password);

        await harness.clickLoginButton();

        const request = await waitForLoginRequest(testingController);

        request.flush(null, {
            status: 500,
            statusText: 'Internal Server Error',
        });

        expect(await harness.hasErrorMessage()).toBeTrue();
        expect(await harness.getErrorMessage()).toEqual(
            'Something unexpected went wrong while trying to log in. Try again later'
        );
    }));

    it('should have disabled submit button with only username entered', async () => {
        const { harness } = await initializeTestEnvironment();

        expect(await harness.getUsernameInputValue()).toEqual('');

        await harness.inputUsername('user1');
        expect(await harness.getUsernameInputValue()).toEqual('user1');
        expect(await harness.isLoginButtonDisabled()).toBeTrue();
    });

    it('should have disabled submit button with only password entered', async () => {
        const { harness } = await initializeTestEnvironment();

        expect(await harness.getPasswordInputValue()).toEqual('');

        await harness.inputPassword('secure_password');
        expect(await harness.getPasswordInputValue()).toEqual('secure_password');
        expect(await harness.isLoginButtonDisabled()).toBeTrue();
    });
});
