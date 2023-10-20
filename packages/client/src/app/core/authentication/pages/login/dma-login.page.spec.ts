import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaHttpRequestTestingModule, DmaLoginHarness } from '../../../../../testing';
import { DmaLoginModule } from './dma-login.module';

describe('DmaLoginComponent', () => {
    @Component({
        template: '<dma-login></dma-login>',
    })
    class TestComponent {}

    async function initializeTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule, DmaLoginModule, RouterTestingModule],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaLoginHarness),
            testController: TestBed.inject(HttpTestingController),
        };
    }

    afterEach(() => TestBed.inject(HttpTestingController).verify());

    it('should have disabled submit button with empty form', async () => {
        const { harness } = await initializeTestEnvironment();

        expect(await harness.isLoginButtonDisabled()).toBeTrue();
    });

    it('should be able to submit form and succeed', async () => {
        const { harness, testController } = await initializeTestEnvironment();

        await harness.inputUsername('user1');
        await harness.inputPassword('secure_password');

        expect(await harness.isLoginButtonDisabled()).toBeFalse();

        await harness.clickLoginButton();

        const request = testController.expectOne('http://localhost:8080/authentication/login');

        expect(request.request.body).toEqual({ username: 'user1', password: 'secure_password' });

        request.flush(null, {
            status: 200,
            statusText: 'success',
            headers: {
                Authorization: 'Bearer token',
            },
        });

        expect(await harness.hasSuccessMessage()).toBeTrue();
        expect(await harness.getSuccessMessage()).toEqual('Login successful');
    });

    it('should be able to handle unknown error responses', async () => {
        const { harness, testController } = await initializeTestEnvironment();

        await harness.inputUsername('user1');
        await harness.inputPassword('secure_password');

        await harness.clickLoginButton();

        const request = testController.expectOne('http://localhost:8080/authentication/login');

        request.flush(null, {
            status: 401,
            statusText: 'Unauthorized',
        });

        expect(await harness.hasErrorMessage()).toBeTrue();
        expect(await harness.getErrorMessage()).toEqual('Invalid username/password');
    });

    it('should be able to handle client or server error responses', async () => {
        const { harness, testController } = await initializeTestEnvironment();

        await harness.inputUsername('user1');
        await harness.inputPassword('secure_password');

        await harness.clickLoginButton();

        const request = testController.expectOne('http://localhost:8080/authentication/login');

        request.flush(null, {
            status: 500,
            statusText: 'Internal server error',
        });

        expect(await harness.hasErrorMessage()).toBeTrue();
        expect(await harness.getErrorMessage()).toEqual(
            'Something unexpected went wrong while trying to log in. Try again later'
        );
    });

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
