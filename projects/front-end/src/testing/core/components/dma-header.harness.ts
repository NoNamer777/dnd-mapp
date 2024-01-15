import { ComponentHarness } from '@angular/cdk/testing';

export class DmaHeaderHarness extends ComponentHarness {
    static hostSelector = 'dma-header';

    private navItemsLocator = this.locatorForAll('.nav-item');

    async isNavItemByLabelVisible(label: string) {
        return Boolean(await this.findNavItemByLabel(label));
    }

    async findNavItemByLabel(label: string) {
        return (await this.navItemsLocator()).find(async (element) => (await element.text()) === label);
    }
}
