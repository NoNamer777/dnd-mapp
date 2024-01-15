import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-center',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dma-center.component.html',
    styleUrls: ['./dma-center.component.scss'],
})
export class DmaCenterComponent {}
