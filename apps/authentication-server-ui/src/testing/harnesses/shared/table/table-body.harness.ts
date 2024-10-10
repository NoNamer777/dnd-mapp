import { ComponentHarness } from '@angular/cdk/testing';
import { TableRowHarness } from './table-row.harness';

export class TableBodyHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-table-body';

    private readonly emptyRowLocator = this.locatorForOptional(TableRowHarness.with({ className: 'empty' }));

    public async isTableEmptyMessageVisible() {
        return Boolean(await this.emptyRowLocator());
    }

    public async getEmptyRowText() {
        return await (await this.emptyRowLocator()).text();
    }
}
