import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { DmaTooltipPosition } from './dma-tooltip.directive';

@Component({
    selector: 'dma-tooltip',
    templateUrl: './dma-tooltip.component.html',
    styleUrls: ['./dma-tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaTooltipComponent {
    text: string;

    @HostBinding('attr.dma-tooltip-position')
    position: DmaTooltipPosition = 'above';
}
