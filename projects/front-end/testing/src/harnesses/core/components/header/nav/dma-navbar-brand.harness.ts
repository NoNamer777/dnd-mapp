import { ComponentHarness } from '@angular/cdk/testing';

export class DmaNavbarBrandHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-navbar-brand';

    private readonly anchorLocator = this.locatorFor('a');

    async navigateToHome() {
        await (await this.anchorLocator()).click();
    }
}
