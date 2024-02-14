import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

interface DmaNavigationBarButtonFilers extends BaseHarnessFilters {
    active?: boolean;
}

export class DmaNavigationBarButtonHarness extends ComponentHarness {
    static hostSelector = 'dma-navigation-bar-button';

    static with = (options: DmaNavigationBarButtonFilers) =>
        new HarnessPredicate(DmaNavigationBarButtonHarness, options).addOption('active', options.active, (harness) =>
            harness.isActive()
        );

    private buttonLocator = this.locatorFor('button[dma-icon-button]');

    async select() {
        await (await this.buttonLocator()).click();
    }

    async isActive() {
        return await (await this.host()).hasClass('active');
    }
}
