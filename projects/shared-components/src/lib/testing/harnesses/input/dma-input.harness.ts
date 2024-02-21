import { ComponentHarness } from '@angular/cdk/testing';

export class DmaInputHarness extends ComponentHarness {
    static hostSelector = 'dma-input';

    private labelLocator = this.locatorForOptional('label');
    private inputLocator = this.locatorFor('input');

    async hasLabel() {
        return Boolean(await this.labelLocator());
    }

    async hasLabelMovedUp() {
        return (await (await this.labelLocator()).getProperty<number>('offsetTop')) < 0;
    }

    async isDisabled() {
        return await (await this.host()).hasClass('disabled');
    }

    async isFocused() {
        return await (await this.host()).hasClass('focused');
    }

    async label() {
        return await (await this.labelLocator()).text();
    }

    async value() {
        return await (await this.inputLocator()).getProperty<string>('value');
    }

    async setValue(value: string) {
        await (await this.inputLocator()).sendKeys(value);
        await (await this.inputLocator()).dispatchEvent('change', { value: value });
    }

    async focus() {
        await (await this.host()).click();
    }

    async blur() {
        await (await this.inputLocator()).blur();
    }
}
