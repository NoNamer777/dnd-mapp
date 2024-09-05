import { ComponentHarness } from '@angular/cdk/testing';

export class DmaTooltipHarness extends ComponentHarness {
    static hostSelector = 'dma-tooltip';

    async getText() {
        return await (await this.host()).text();
    }

    async getPosition() {
        return await (await this.host()).getAttribute('dma-tooltip-position');
    }
}
