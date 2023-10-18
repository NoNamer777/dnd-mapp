import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-header',
    templateUrl: './dma-header.component.html',
    styleUrls: ['./dma-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaHeaderComponent {}
