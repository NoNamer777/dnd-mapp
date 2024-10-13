import { ChangeDetectionStrategy, Component, HostBinding, signal } from '@angular/core';

@Component({
    selector: 'dma-table-column',
    templateUrl: './table-column.component.html',
    styleUrl: './table-column.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TableColumnComponent {
    public width = signal(100);

    @HostBinding('style.flexBasis.%') protected get flexBasis() {
        return this.width();
    }
}
