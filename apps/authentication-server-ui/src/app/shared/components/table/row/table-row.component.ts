import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { TableColumnComponent } from '../column/table-column.component';

@Component({
    selector: 'dma-table-row',
    templateUrl: './table-row.component.html',
    styleUrl: './table-row.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TableRowComponent implements AfterViewInit {
    @ContentChildren(TableColumnComponent) private readonly columns: QueryList<TableColumnComponent>;

    public ngAfterViewInit() {
        const width = 100 / this.columns.length;

        this.columns.forEach((column) => column.width.set(width));
    }
}
