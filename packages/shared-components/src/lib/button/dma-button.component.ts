import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { DmaStateComponent, StateColors } from '../state';

export type DmaButtonType = 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';

const containerColorsPerButtonType = new Map<DmaButtonType, StateColors>([
    ['elevated', { baseLayer: 'var(--surface-container-low)', stateLayer: 'var(--primary)' }],
    ['filled', { baseLayer: 'var(--primary)', stateLayer: 'var(--on-primary)' }],
    ['tonal', { baseLayer: 'var(--secondary-container)', stateLayer: 'var(--on-secondary-container)' }],
    ['outlined', { baseLayer: 'var(--surface)', stateLayer: 'var(--primary)' }],
    ['text', { baseLayer: 'transparent', stateLayer: 'var(--primary)' }],
]);

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './dma-button.component.html',
    styleUrls: ['./dma-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaButtonComponent extends DmaStateComponent implements OnInit {
    @Input('dma-button') set dmaButtonType(buttonType: unknown) {
        if (buttonType === '') return;

        // TODO - Enforce only DmaButtonType values as valid
        this.buttonType = buttonType as DmaButtonType;

        this.updateRenderedAttribute();
    }

    @HostBinding('attr.dma-button')
    private buttonType: DmaButtonType = 'text';

    ngOnInit() {
        this.updateRenderedAttribute();
    }

    private updateRenderedAttribute() {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        this.baseColor = this.getBackgroundColorsForType(this.buttonType, 'base');
        this.layerColor = this.getBackgroundColorsForType(this.buttonType, 'state');
    }

    private getBackgroundColorsForType(type: DmaButtonType, layer: 'base' | 'state') {
        console.log(type);
        return containerColorsPerButtonType.get(type)[layer + 'Layer'];
    }
}
