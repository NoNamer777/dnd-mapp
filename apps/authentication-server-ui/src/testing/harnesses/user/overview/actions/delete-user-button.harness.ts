import { ComponentHarness } from '@angular/cdk/testing';
import { ButtonHarness, TooltipAnchorHarness } from '../../../shared';

export class DeleteUserButtonHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-delete-user-button';

    private readonly buttonLocator = this.locatorFor(ButtonHarness);
    private readonly tooltipAnchorLocator = this.locatorFor(TooltipAnchorHarness);

    public async click() {
        await (await this.buttonLocator()).click();
    }

    public async hoverOverAnchor() {
        await (await this.tooltipAnchorLocator()).hoverOverAnchor();
    }

    public async isProcessing() {
        return await (await this.buttonLocator()).isProcessing();
    }

    public async isTooltipVisible() {
        return await (await this.tooltipAnchorLocator()).isTooltipAdded();
    }
}
