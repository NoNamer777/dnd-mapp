import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type DmaButtonType = 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    template: `<ng-content />`,
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    @Input('dma-button') dmaButtonType: DmaButtonType = 'text';
}
