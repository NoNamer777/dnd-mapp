import { ComponentHarness } from '@angular/cdk/testing';

export class LifetimeBarHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-lifetime-bar';

    async getBackgroundStyle() {
        return await (await this.host()).getAttribute('style');
    }
}
