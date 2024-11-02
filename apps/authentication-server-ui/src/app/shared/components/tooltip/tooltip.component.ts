import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrl: './tooltip.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TooltipComponent {
    public label: string;
}
