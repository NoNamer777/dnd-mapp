import { ComponentHarness } from '@angular/cdk/testing';
import { TooltipHarness } from './tooltip.harness';

export class TooltipAnchorHarness extends ComponentHarness {
    public static readonly hostSelector = '[dmaTooltip]';

    private tooltipLocator = this.documentRootLocatorFactory().locatorForOptional(TooltipHarness);
    private cdkOverlayLocator = this.documentRootLocatorFactory().locatorForOptional('.cdk-overlay-pane');

    public async isTooltipVisible() {
        return Boolean(await this.tooltipLocator());
    }

    public async tooltipIsPositionedAt(position: string) {
        return await (await this.cdkOverlayLocator()).hasClass(`dma-tooltip-${position}`);
    }

    public async getTooltipLabel() {
        return await (await this.tooltipLocator()).label();
    }

    public async mouseenter() {
        await (await this.host()).hover();
    }

    public async mouseleave() {
        await (await this.host()).mouseAway();
    }
}
