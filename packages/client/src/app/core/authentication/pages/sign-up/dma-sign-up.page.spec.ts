import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../../environments';
import { DmaHttpRequestTestingModule, DmaSignupHarness } from '../../../../../testing';
import { DmaSignUpModule } from './dma-sign-up.module';

describe('DmaSignUpPage', () => {
    @Component({
        template: '<dma-signup></dma-signup>',
    })
    class TestComponent {}

    async function initializeTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaSignUpModule, RouterTestingModule, NoopAnimationsModule, DmaHttpRequestTestingModule],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaSignupHarness),
            testingController: TestBed.inject(HttpTestingController),
        };
    }

    async function inputFieldsStage1AndContinueToStage2(harness: DmaSignupHarness) {
        await harness.inputFormControlValue('username', 'user1');
        await harness.inputFormControlValue('email', 'user1@domain.com');
        await harness.inputFormControlValue('emailConfirm', 'user1@domain.com');

        await harness.clickNextButton();
    }

    afterEach(() => TestBed.inject(HttpTestingController).verify());

    it('should have disabled next button with empty form', async () => {
        const { harness } = await initializeTestEnvironment();

        expect(await harness.isFormControlVisible('username')).toBeTrue();
        expect(await harness.isFormControlVisible('email')).toBeTrue();
        expect(await harness.isFormControlVisible('emailConfirm')).toBeTrue();
        expect(await harness.isFormControlVisible('password')).toBeFalse();
        expect(await harness.isFormControlVisible('passwordConfirm')).toBeFalse();

        expect(await harness.getFormControlValue('username')).toEqual('');
        expect(await harness.getFormControlValue('email')).toEqual('');
        expect(await harness.getFormControlValue('emailConfirm')).toEqual('');

        expect(await harness.isNextButtonVisible()).toBeTrue();
        expect(await harness.isNextButtonDisabled()).toBeTrue();
        expect(await harness.isPreviousButtonVisible()).toBeFalse();
        expect(await harness.isSignupButtonVisible()).toBeFalse();
    });

    it('should be able to submit signup form', async () => {
        const { harness, testingController } = await initializeTestEnvironment();
        const expectedFormValue = {
            username: 'user1',
            emailAddress: 'user1@domain.com',
            password: 'secure_password',
        };

        await inputFieldsStage1AndContinueToStage2(harness);
        await harness.inputFormControlValue('password', 'secure_password');
        await harness.inputFormControlValue('passwordConfirm', 'secure_password');

        expect(await harness.isSignupButtonDisabled()).toBeFalse();
        expect(await harness.isLoadingSpinnerVisible()).toBeFalse();

        await harness.clickSignupButton();

        expect(await harness.isLoadingSpinnerVisible()).toBeTrue();

        const request = testingController.expectOne(`${environment.baseBackEndURL}/authentication/sign-up`);

        expect(request.request.body).toEqual(expectedFormValue);

        request.flush({ ...expectedFormValue, id: 1, roles: [{ id: 1, name: 'Player' }] });

        expect(await harness.isLoadingSpinnerVisible()).toBeFalse();
        expect(await harness.shouldShowSuccessMessage()).toBeTrue();
        expect(await harness.shouldShowErrorMessage()).toBeFalse();
        expect(await harness.getSuccessMessage()).toEqual(
            `You've successfully registered an account. You can now go on and log in`
        );
    });

    it('should show an error message when the username is not available', async () => {
        const { harness, testingController } = await initializeTestEnvironment();

        await inputFieldsStage1AndContinueToStage2(harness);
        await harness.inputFormControlValue('password', 'secure_password');
        await harness.inputFormControlValue('passwordConfirm', 'secure_password');

        expect(await harness.isSignupButtonDisabled()).toBeFalse();
        expect(await harness.isLoadingSpinnerVisible()).toBeFalse();

        await harness.clickSignupButton();

        expect(await harness.isLoadingSpinnerVisible()).toBeTrue();

        testingController
            .expectOne(`${environment.baseBackEndURL}/authentication/sign-up`)
            .flush({}, { status: 400, statusText: 'Bad Request' });

        expect(await harness.isLoadingSpinnerVisible()).toBeFalse();
        expect(await harness.shouldShowSuccessMessage()).toBeFalse();
        expect(await harness.shouldShowErrorMessage()).toBeTrue();
        expect(await harness.getErrorMessage()).toEqual(
            'The username is currently unavailable. Please, use a different one'
        );
    });

    it('should show an error message with a generic server error', async () => {
        const { harness, testingController } = await initializeTestEnvironment();

        await inputFieldsStage1AndContinueToStage2(harness);
        await harness.inputFormControlValue('password', 'secure_password');
        await harness.inputFormControlValue('passwordConfirm', 'secure_password');

        expect(await harness.isSignupButtonDisabled()).toBeFalse();

        await harness.clickSignupButton();

        testingController
            .expectOne(`${environment.baseBackEndURL}/authentication/sign-up`)
            .flush({}, { status: 500, statusText: 'Internal Server Error' });

        expect(await harness.shouldShowSuccessMessage()).toBeFalse();
        expect(await harness.shouldShowErrorMessage()).toBeTrue();
        expect(await harness.getErrorMessage()).toEqual('Something unexpected has happened. Please, try again later');
    });

    it('should not go to the next stage with empty form', async () => {
        const { harness } = await initializeTestEnvironment();

        await harness.clickNextButton();

        expect(await harness.isSignupButtonVisible()).toBeFalse();
    });

    it('should have disabled next button with only username entered', async () => {
        const { harness } = await initializeTestEnvironment();

        await harness.inputFormControlValue('username', 'user1');

        expect(await harness.getFormControlValue('username')).toEqual('user1');
        expect(await harness.isNextButtonDisabled()).toBeTrue();
    });

    it('should have disabled next button with only username and email entered', async () => {
        const { harness } = await initializeTestEnvironment();

        await harness.inputFormControlValue('username', 'user1');
        await harness.inputFormControlValue('email', 'user1@domain.com');

        expect(await harness.getFormControlValue('username')).toEqual('user1');
        expect(await harness.getFormControlValue('email')).toEqual('user1@domain.com');
        expect(await harness.isNextButtonDisabled()).toBeTrue();
    });

    it('should be able to continue to stage 2 with username and email inputted and email confirmed.', async () => {
        const { harness } = await initializeTestEnvironment();

        await harness.inputFormControlValue('username', 'user1');
        await harness.inputFormControlValue('email', 'user1@domain.com');
        await harness.inputFormControlValue('emailConfirm', 'user1@domain.com');

        expect(await harness.getFormControlValue('username')).toEqual('user1');
        expect(await harness.getFormControlValue('email')).toEqual('user1@domain.com');
        expect(await harness.getFormControlValue('emailConfirm')).toEqual('user1@domain.com');
        expect(await harness.isNextButtonDisabled()).toBeFalse();

        await harness.clickNextButton();

        expect(await harness.isFormControlVisible('username')).toBeFalse();
        expect(await harness.isFormControlVisible('email')).toBeFalse();
        expect(await harness.isFormControlVisible('emailConfirm')).toBeFalse();
        expect(await harness.isFormControlVisible('password')).toBeTrue();
        expect(await harness.isFormControlVisible('passwordConfirm')).toBeTrue();

        expect(await harness.getFormControlValue('password')).toEqual('');
        expect(await harness.getFormControlValue('passwordConfirm')).toEqual('');

        expect(await harness.isNextButtonVisible()).toBeFalse();
        expect(await harness.isPreviousButtonVisible()).toBeTrue();
        expect(await harness.isSignupButtonVisible()).toBeTrue();
        expect(await harness.isSignupButtonDisabled()).toBeTrue();
    });

    it('should be able to go to stage 1 from stage 2', async () => {
        const { harness } = await initializeTestEnvironment();

        await inputFieldsStage1AndContinueToStage2(harness);

        expect(await harness.isPreviousButtonVisible()).toBeTrue();

        await harness.clickPreviousButton();

        expect(await harness.isPreviousButtonVisible()).toBeFalse();
        expect(await harness.isNextButtonVisible()).toBeTrue();
    });

    it('should not be able to submit form with only password entered', async () => {
        const { harness } = await initializeTestEnvironment();

        await inputFieldsStage1AndContinueToStage2(harness);
        await harness.inputFormControlValue('password', 'secure_password');

        expect(await harness.isSignupButtonDisabled()).toBeTrue();
    });
});
