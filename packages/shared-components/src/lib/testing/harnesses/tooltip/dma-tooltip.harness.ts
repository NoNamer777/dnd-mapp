import { ComponentHarness } from '@angular/cdk/testing';

export class DmaTooltipHarness extends ComponentHarness {
    static hostSelector = '[dmaTooltip]';

    private tooltipLocator = this.documentRootLocatorFactory().locatorForOptional('dma-tooltip');

    async hoverOverParentElement() {
        await (await this.host()).hover();
    }

    async moveMouseAwayFromParentElement() {
        await (await this.host()).mouseAway();
    }

    async isTooltipVisible() {
        return Boolean(await this.tooltipLocator());
    }

    async getTooltipText() {
        return await (await this.tooltipLocator()).text();
    }

    async getTooltipPosition() {
        return await (await this.tooltipLocator()).getAttribute('dma-tooltip-position');
    }
}
