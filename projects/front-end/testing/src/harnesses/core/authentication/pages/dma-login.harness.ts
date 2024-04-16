import { ComponentHarness } from '@angular/cdk/testing';

export class DmaLoginHarness extends ComponentHarness {
    static hostSelector = 'dma-login';

    private errorMessageLocator = this.locatorForOptional('p.text-danger');
    private loginButtonLocator = this.locatorFor(`button[type='submit']`);
    private passwordInputLocator = this.locatorFor(`input[formControlName='password']`);
    private successMessageLocator = this.locatorForOptional('p.text-success');
    private usernameInputLocator = this.locatorFor(`input[formControlName='username']`);

    async clickLoginButton() {
        await (await this.loginButtonLocator()).click();
    }

    async hasErrorMessage() {
        return Boolean(await this.errorMessageLocator());
    }

    async hasSuccessMessage() {
        return Boolean(await this.successMessageLocator());
    }

    async getErrorMessage() {
        return await (await this.errorMessageLocator())!.text();
    }

    async getSuccessMessage() {
        return await (await this.successMessageLocator())!.text();
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
