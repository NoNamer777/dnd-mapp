import { ComponentHarness } from '@angular/cdk/testing';
import { DmaIconHarness } from '@dnd-mapp/shared-components/testing';

export class DmaNavButtonHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-nav-button';

    private readonly iconLocator = this.locatorFor(DmaIconHarness);

    async getLabel() {
        return await (await this.host()).text();
    }

    async getIcon() {
        return await this.iconLocator();
    }
}
