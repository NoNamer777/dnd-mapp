import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

interface DmaOptionHarnessFilters extends BaseHarnessFilters {
    selected?: boolean;
}

export class DmaOptionHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-option';

    static with(options: DmaOptionHarnessFilters) {
        return new HarnessPredicate(DmaOptionHarness, options).addOption('selected', options.selected, (harness) =>
            harness.isSelected()
        );
    }

    async text() {
        return await (await this.host()).getAttribute('label');
    }

    async isSelected() {
        return await (await this.host()).hasClass('selected');
    }

    async select() {
        await (await this.host()).click();
    }
}
