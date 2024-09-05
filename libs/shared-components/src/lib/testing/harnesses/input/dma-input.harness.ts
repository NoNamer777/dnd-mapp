import { ComponentHarness } from '@angular/cdk/testing';

export class DmaInputHarness extends ComponentHarness {
    static hostSelector = 'dma-input';

    private inputContainerLocator = this.locatorFor('.input-container');
    private labelLocator = this.locatorForOptional('label');
    private inputLocator = this.locatorFor('input');
    private supportingTextLocator = this.locatorForOptional('.input-support .text');

    async containsLeadingIcon() {
        return await (await this.host()).hasClass('with-leading-icon');
    }

    async hasLabel() {
        return Boolean(await this.labelLocator());
    }

    async label() {
        return await (await this.labelLocator()).text();
    }

    async hasLabelMovedUp() {
        return (await (await this.labelLocator()).getProperty<number>('offsetTop')) < 0;
    }

    async hasSupportingText() {
        return Boolean(await this.supportingTextLocator());
    }

    async supportingText() {
        return await (await this.supportingTextLocator()).text();
    }

    async isTouched() {
        return await (await this.host()).hasClass('ng-touched');
    }

    async isUntouched() {
        return await (await this.host()).hasClass('ng-untouched');
    }

    async isValid() {
        return await (await this.host()).hasClass('ng-valid');
    }

    async isInvalid() {
        return await (await this.host()).hasClass('ng-invalid');
    }

    async isDirty() {
        return await (await this.host()).hasClass('ng-dirty');
    }

    async isPristine() {
        return await (await this.host()).hasClass('ng-pristine');
    }

    async isDisabled() {
        return await (await this.host()).hasClass('disabled');
    }

    async isFocused() {
        return await (await this.host()).hasClass('focused');
    }

    async value() {
        return await (await this.inputLocator()).getProperty<unknown>('value');
    }

    async setValue(value: string) {
        const inputTestElem = await this.inputLocator();

        await this.focus();

        await inputTestElem.clear();
        await inputTestElem.sendKeys(value);

        await this.blur();
    }

    async focus() {
        await (await this.inputContainerLocator()).click();
    }

    async blur() {
        await (await this.inputLocator()).blur();
    }
}
