import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-root',
    templateUrl: './dma-root.component.html',
    styleUrls: ['./dma-root.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaRootComponent {}
