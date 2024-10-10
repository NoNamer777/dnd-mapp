import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-table-column',
    templateUrl: './table-column.component.html',
    styleUrl: './table-column.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TableColumnComponent {}
