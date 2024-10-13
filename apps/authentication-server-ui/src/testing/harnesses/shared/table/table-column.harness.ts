import { ComponentHarness } from '@angular/cdk/testing';

export class TableColumnHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-table-column';

    public async text() {
        return await (await this.host()).text();
    }

    public async width() {
        return await (await this.host()).getCssValue('flex-basis');
    }
}
