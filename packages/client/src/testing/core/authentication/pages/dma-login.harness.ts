import { ComponentHarness } from '@angular/cdk/testing';

export class DmaLoginHarness extends ComponentHarness {
    static hostSelector = 'dma-login';

    private loginButtonLocator = this.locatorFor(`button[type='submit']`);
    private usernameInputLocator = this.locatorFor(`input[formControlName='username']`);
    private passwordInputLocator = this.locatorFor(`input[formControlName='password']`);

    async clickLoginButton() {
        await (await this.loginButtonLocator()).click();
    }

    async getPasswordInputValue() {
        return await (await this.passwordInputLocator()).getProperty<string>('value');
    }

    async getUsernameInputValue() {
        return await (await this.usernameInputLocator()).getProperty<string>('value');
    }

    async inputPassword(password: string) {
        await (await this.passwordInputLocator()).sendKeys(password);
    }

    async inputUsername(username: string) {
        await (await this.usernameInputLocator()).sendKeys(username);
    }

    async isLoginButtonDisabled() {
        return await (await this.loginButtonLocator()).getProperty<boolean>('disabled');
    }
}
