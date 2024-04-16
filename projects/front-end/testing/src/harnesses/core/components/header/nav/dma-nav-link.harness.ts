import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

interface DmaNavLinkFilters extends BaseHarnessFilters {
    label?: string;
}

export class DmaNavLinkHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-nav-link';

    static readonly with = (options: DmaNavLinkFilters) =>
        new HarnessPredicate(DmaNavLinkHarness, options).addOption('label', options.label, (harness, label) =>
            HarnessPredicate.stringMatches(harness.getLabel(), label)
        );

    private readonly anchorLocator = this.locatorFor('a');

    async navigate() {
        await (await this.anchorLocator()).click();
    }

    async getLabel() {
        return await (await this.anchorLocator()).text();
    }
}
