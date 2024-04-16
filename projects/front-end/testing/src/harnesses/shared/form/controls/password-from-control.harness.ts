import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

interface PasswordFormControlFilters extends BaseHarnessFilters {
    controlName: string;
}

export class PasswordFromControlHarness extends ComponentHarness {
    static hostSelector = 'dma-password-form-control';

    static with = (options: PasswordFormControlFilters) =>
        new HarnessPredicate(PasswordFromControlHarness, options).addOption(
            'control name',
            options.controlName,
            (harness, controlName) =>
                HarnessPredicate.stringMatches(harness.getInputFieldFormControlName(), controlName)
        );

    private labelLocator = this.locatorFor('label');
    private inputLocator = this.locatorFor('input');
    private iconLocator = this.locatorFor('fa-icon svg');

    getInputField = async () => await this.inputLocator();

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
