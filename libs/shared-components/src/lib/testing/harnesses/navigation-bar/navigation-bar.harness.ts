import { ComponentHarness } from '@angular/cdk/testing';
import { DmaNavigationBarButtonHarness } from './navigation-bar-button.harness';

export class DmaNavigationBarHarness extends ComponentHarness {
    static hostSelector = 'footer[dma-navigation-bar]';

    private activeButtonLocator = this.locatorForOptional(DmaNavigationBarButtonHarness.with({ active: true }));

    private buttonsLocator = this.locatorForAll(DmaNavigationBarButtonHarness);

    async getButton(index: number) {
        return (await this.buttonsLocator())[index];
    }

    async hasActiveButton() {
        return Boolean(await this.activeButtonLocator());
    }
}
