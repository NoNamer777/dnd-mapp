import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { defaultUser } from '@dnd-mapp/data/testing';
import { DmaLoginHarness } from '@dnd-mapp/front-end/testing';
import { TextCodingService } from '../../../../shared';
import { DmaLoginPage } from './dma-login.page';

xdescribe('DmaLoginComponent', () => {
    @Component({
        template: '<dma-login></dma-login>',
    })
    class TestComponent {}

    async function initializeTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaLoginPage],
            providers: [provideHttpClient(), provideRouter([])],
            declarations: [TestComponent],
        });

        // The Web Crypto API is only available in a secure environment (HTTPS). Since the tests don't run
        // in such an environment, we need to fake the returned value for now.
        spyOn(crypto.subtle, 'digest').and.resolveTo(
            TestBed.inject(TextCodingService).encode('mock_code_challenge').buffer
        );

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaLoginHarness),
        };
    }

    it('should have disabled submit button with empty form', async () => {
        const { harness } = await initializeTestEnvironment();

        expect(await harness.isLoginButtonDisabled()).toBeTrue();
    });

    it('should be able to submit form and succeed', async () => {
        const { harness } = await initializeTestEnvironment();
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

        expect(await harness.hasSuccessMessage()).toBeTrue();
        expect(await harness.getSuccessMessage()).toEqual('Login successful');
    });

    it('should be able to handle invalid credentials error responses', fakeAsync(async () => {
        const { harness } = await initializeTestEnvironment();
        const { username } = defaultUser;

        await harness.inputUsername(username);
        await harness.inputPassword('fake_password');

        await harness.clickLoginButton();

        expect(await harness.hasErrorMessage()).toBeTrue();
        expect(await harness.getErrorMessage()).toEqual('Invalid username/password');
    }));

    it('should be able to handle client or server error responses', fakeAsync(async () => {
        const { harness } = await initializeTestEnvironment();
        const { username, password } = defaultUser;

        await harness.inputUsername(username);
        await harness.inputPassword(password);

        await harness.clickLoginButton();

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
