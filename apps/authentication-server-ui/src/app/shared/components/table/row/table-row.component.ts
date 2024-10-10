import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-table-row',
    templateUrl: './table-row.component.html',
    styleUrl: './table-row.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TableRowComponent {}
