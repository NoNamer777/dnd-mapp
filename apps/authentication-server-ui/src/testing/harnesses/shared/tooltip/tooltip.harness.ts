import { ComponentHarness } from '@angular/cdk/testing';

export class TooltipHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-tooltip';

    public async label() {
        return await (await this.host()).text();
    }
}
