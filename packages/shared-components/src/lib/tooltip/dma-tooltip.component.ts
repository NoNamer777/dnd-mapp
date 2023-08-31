import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-tooltip',
    templateUrl: './dma-tooltip.component.html',
    styleUrls: ['./dma-tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaTooltipComponent {
    text: string;
}
