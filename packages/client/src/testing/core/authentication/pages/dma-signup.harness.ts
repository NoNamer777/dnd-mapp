import { ComponentHarness } from '@angular/cdk/testing';

type SignupFormControlName = 'username' | 'email' | 'emailConfirm' | 'password' | 'passwordConfirm';

export class DmaSignupHarness extends ComponentHarness {
    static hostSelector = 'dma-signup';

    private nextButtonLocator = this.locatorForOptional(`button[type='button'].btn-primary`);
    private previousButtonLocator = this.locatorForOptional(`button[type='button'].btn-secondary`);
    private signupButtonLocator = this.locatorForOptional(`button[type='submit']`);
    private usernameInputLocator = this.locatorForOptional(`input[formControlName='username']`);
    private emailInputLocator = this.locatorForOptional(`input[formControlName='email']`);
    private emailConfirmInputLocator = this.locatorForOptional(`input[formControlName='emailConfirm']`);
    private passwordInputLocator = this.locatorForOptional(`input[formControlName='password']`);
    private passwordConfirmInputLocator = this.locatorForOptional(`input[formControlName='passwordConfirm']`);

    private controls = new Map([
        ['username', this.usernameInputLocator],
        ['email', this.emailInputLocator],
        ['emailConfirm', this.emailConfirmInputLocator],
        ['password', this.passwordInputLocator],
        ['passwordConfirm', this.passwordConfirmInputLocator],
    ]);

    async clickNextButton() {
        await (await this.nextButtonLocator())!.click();
    }

    async clickPreviousButton() {
        await (await this.previousButtonLocator())!.click();
    }

    async clickSignupButton() {
        await (await this.signupButtonLocator())!.click();
    }

    async getFormControlValue(formControlName: SignupFormControlName) {
        return await (await this.controls.get(formControlName)!())!.getProperty<string>('value');
    }

    async inputFormControlValue(formControlName: SignupFormControlName, value: string) {
        await (await this.controls.get(formControlName)!())!.sendKeys(value);
    }

    async isNextButtonDisabled() {
        return await (await this.nextButtonLocator())!.getProperty<boolean>('disabled');
    }

    async isNextButtonVisible() {
        return Boolean(await this.nextButtonLocator());
    }

    async isPreviousButtonVisible() {
        return Boolean(await this.previousButtonLocator());
    }

    async isSignupButtonDisabled() {
        return await (await this.signupButtonLocator())!.getProperty<boolean>('disabled');
    }

    async isSignupButtonVisible() {
        return Boolean(await this.signupButtonLocator());
    }

    async isFormControlVisible(formControlName: SignupFormControlName) {
        return Boolean(await this.controls.get(formControlName)!());
    }
}
