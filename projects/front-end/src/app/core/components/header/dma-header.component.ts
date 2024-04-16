import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmaNavComponent } from './nav/dma-nav.component';

@Component({
    selector: 'dma-header',
    templateUrl: './dma-header.component.html',
    styleUrl: './dma-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [DmaNavComponent],
})
export class DmaHeaderComponent {}
