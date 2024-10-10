import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

interface TableRowHarnessFilters extends BaseHarnessFilters {
    className?: string;
}

export class TableRowHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-table-row';

    public static with = (options?: TableRowHarnessFilters) =>
        new HarnessPredicate(TableRowHarness, options).addOption('className', options.className, (harness, className) =>
            harness.hasClassName(className)
        );

    public async hasClassName(className: string) {
        return await (await this.host()).hasClass(className);
    }

    public async text() {
        return await (await this.host()).text();
    }
}
