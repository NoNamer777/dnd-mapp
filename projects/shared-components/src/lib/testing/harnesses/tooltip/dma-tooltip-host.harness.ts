import { ComponentHarness } from '@angular/cdk/testing';
import { DmaTooltipHarness } from './dma-tooltip.harness';

export class DmaTooltipHostHarness extends ComponentHarness {
    static hostSelector = '[dmaTooltip]';

    private tooltipLocator = this.documentRootLocatorFactory().locatorForOptional(DmaTooltipHarness);

    async hover() {
        await (await this.host()).hover();
    }

    async moveCursorAway() {
        await (await this.host()).mouseAway();
    }

    async isTooltipVisible() {
        return Boolean(await this.tooltipLocator());
    }

    async getTooltipText() {
        return await (await this.tooltipLocator()).getText();
    }

    async getTooltipPosition() {
        return await (await this.tooltipLocator()).getPosition();
    }
}
