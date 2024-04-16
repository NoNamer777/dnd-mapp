import { ComponentHarness } from '@angular/cdk/testing';
import { DmaTooltipHarness } from '../tooltip/dma-tooltip.harness';

export class DmaIconButtonHarness extends ComponentHarness {
    static hostSelector = 'button[dma-icon-button]';

    private iconLocator = this.locatorFor('dma-icon');
    private labelLocator = this.documentRootLocatorFactory().locatorForOptional(DmaTooltipHarness);

    async click() {
        await (await this.host()).click();
    }

    async hover() {
        await (await this.host()).hover();
    }

    async moveCursorAway() {
        await (await this.host()).mouseAway();
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

    async isLabelVisible() {
        return Boolean(await this.labelLocator());
    }

    async getLabelText() {
        return await (await this.labelLocator()).getText();
    }

    async getLabelPosition() {
        return await (await this.labelLocator()).getPosition();
    }
}
