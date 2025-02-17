import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TableHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { TableModule } from './table.module';

describe('TableComponent', () => {
    @Component({
        template: `
            <dma-table>
                <dma-table-header>
                    <dma-table-row>
                        <dma-table-column>Column 1</dma-table-column>
                        <dma-table-column>Column 2</dma-table-column>
                        <dma-table-column>Column 3</dma-table-column>
                        <dma-table-column>Column 4</dma-table-column>
                    </dma-table-row>
                </dma-table-header>
                <dma-table-body>
                    <dma-table-row>
                        <dma-table-column>Row 1 - Column 1</dma-table-column>
                        <dma-table-column>Row 1 - Column 2</dma-table-column>
                        <dma-table-column>Row 1 - Column 3</dma-table-column>
                        <dma-table-column>Row 1 - Column 4</dma-table-column>
                    </dma-table-row>
                </dma-table-body>
            </dma-table>
        `,
        imports: [TableModule],
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(TableHarness),
        };
    }

    it('should distribute the total width for the available table columns', async () => {
        const { harness } = await setupTest();

        const tableRowHarness = await harness.getRowByIndex(0);
        const columnHarnesses = await tableRowHarness.getColumns();

        for (const columnHarness of columnHarnesses) {
            expect(await columnHarness.width()).toEqual('25%');
        }
    });
});
