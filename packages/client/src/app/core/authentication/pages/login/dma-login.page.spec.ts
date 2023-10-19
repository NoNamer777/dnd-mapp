import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaLoginHarness } from '../../../../../testing';
import { DmaLoginModule } from './dma-login.module';

describe('DmaLoginComponent', () => {
    @Component({
        template: '<dma-login></dma-login>',
    })
    class TestComponent {}

    async function initializeTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaLoginModule, RouterTestingModule],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        // TODO: Remove once proper login process has been put in place.
        spyOn(console, 'warn');

        return {
            harness: await harnessLoader.getHarness(DmaLoginHarness),
        };
    }

    it('should have disabled submit button with empty form', async () => {
        const { harness } = await initializeTestEnvironment();

        expect(await harness.isLoginButtonDisabled()).toBeTrue();
    });

    it('should be able to submit form', async () => {
        const { harness } = await initializeTestEnvironment();

        await harness.inputUsername('user1');
        await harness.inputPassword('secure_password');

        expect(await harness.isLoginButtonDisabled()).toBeFalse();

        await harness.clickLoginButton();
        expect(console.warn).toHaveBeenCalledWith('Form submitted', { username: 'user1', password: 'secure_password' });
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
