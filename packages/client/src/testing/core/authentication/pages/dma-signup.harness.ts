import { ComponentHarness } from '@angular/cdk/testing';

type SignupFormControlName = 'username' | 'email' | 'emailConfirm' | 'password' | 'passwordConfirm';

export class DmaSignupHarness extends ComponentHarness {
    static hostSelector = 'dma-signup';

    private nextButtonLocator = this.locatorFor(`button[type='button'].btn-primary`);
    private previousButtonLocator = this.locatorFor(`button[type='button'].btn-secondary`);
    private signupButtonLocator = this.locatorFor(`button[type='submit']`);

    private loadingIconLocator = this.locatorForOptional(`fa-icon[icon='circle-notch']`);


    private usernameInputLocator = this.locatorFor(`input[formControlName='username']`);
    private emailInputLocator = this.locatorFor(`input[formControlName='email']`);
    private emailConfirmInputLocator = this.locatorFor(`input[formControlName='emailConfirm']`);
    private passwordInputLocator = this.locatorFor(`input[formControlName='password']`);
    private passwordConfirmInputLocator = this.locatorFor(`input[formControlName='passwordConfirm']`);

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

    async isLoadingSpinnerVisible() {
        return Boolean(await this.loadingIconLocator());
    }

    async isNextButtonDisabled() {
        return await (await this.nextButtonLocator())!.getProperty<boolean>('disabled');
    }

    async isNextButtonVisible() {
        return (await (await this.nextButtonLocator()).getCssValue('visibility')) === 'visible';
    }

    async isPreviousButtonVisible() {
        return (await (await this.previousButtonLocator()).getCssValue('visibility')) === 'visible';
    }

    async isSignupButtonDisabled() {
        return await (await this.signupButtonLocator())!.getProperty<boolean>('disabled');
    }

    async isSignupButtonVisible() {
        return (await (await this.signupButtonLocator()).getCssValue('visibility')) === 'visible';
    }

    async isFormControlVisible(formControlName: SignupFormControlName) {
        return (await (await this.controls.get(formControlName)!()).getCssValue('visibility')) === 'visible';
    }
}
