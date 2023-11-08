import { ComponentHarness } from '@angular/cdk/testing';

export class PasswordFromControlHarness extends ComponentHarness {
    static hostSelector = 'dma-password-form-control';

    private labelLocator = this.locatorFor('label');
    private inputLocator = this.locatorFor('input');
    private iconLocator = this.locatorFor('fa-icon svg');

    getLabelContents = async () => await (await this.labelLocator()).text();

    getLabelForAttribute = async () => await (await this.labelLocator()).getAttribute('for');

    getInputFieldType = async () => await (await this.inputLocator()).getAttribute('type');

    async getInputFieldFormControlName() {
        return await (await this.inputLocator()).getAttribute('ng-reflect-name');
    }

    getShownIcon = async () => await (await this.iconLocator()).getAttribute('data-icon');

    async togglePasswordVisibility() {
        await (await this.iconLocator()).click();
    }
}
