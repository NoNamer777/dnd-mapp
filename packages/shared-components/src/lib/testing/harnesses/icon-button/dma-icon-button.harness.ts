import { ComponentHarness } from '@angular/cdk/testing';

export class DmaIconButtonHarness extends ComponentHarness {
    static hostSelector = 'button[dma-icon-button]';

    private iconLocator = this.locatorFor('dma-icon');

    async click() {
        await (await this.host()).click();
    }

    async isSelected() {
        return (await (await this.host()).getAttribute('selected')) === '';
    }

    async getButtonType() {
        return await (await this.host()).getAttribute('dma-icon-button');
    }

    async getRenderedIcon() {
        return await this.iconLocator();
    }
}
