import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { DmaStateDirective, StateColors } from '../state';

export enum DmaButtonTypes {
    ELEVATED = 'elevated',
    FILLED = 'filled',
    TONAL = 'tonal',
    OUTLINED = 'outlined',
    TEXT = 'text',
}

export type DmaButtonType = (typeof DmaButtonTypes)[keyof typeof DmaButtonTypes];

const containerColorsPerButtonType = new Map<DmaButtonType, StateColors>([
    [DmaButtonTypes.ELEVATED, { baseLayer: 'var(--surface-container-low)', stateLayer: 'var(--primary)' }],
    [DmaButtonTypes.FILLED, { baseLayer: 'var(--primary)', stateLayer: 'var(--on-primary)' }],
    [DmaButtonTypes.TONAL, { baseLayer: 'var(--secondary-container)', stateLayer: 'var(--on-secondary-container)' }],
    [DmaButtonTypes.OUTLINED, { baseLayer: 'var(--surface)', stateLayer: 'var(--primary)' }],
    [DmaButtonTypes.TEXT, { baseLayer: 'transparent', stateLayer: 'var(--primary)' }],
]);

function dmaButtonTypeAttribute(buttonType: string | DmaButtonType) {
    return Object.values(DmaButtonTypes as unknown as string[]).includes(buttonType)
        ? (buttonType as DmaButtonType)
        : DmaButtonTypes.TEXT;
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './dma-button.component.html',
    styleUrls: ['./dma-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, DmaStateDirective],
})
export class DmaButtonComponent extends DmaStateDirective {
    @HostBinding('attr.dma-button')
    @Input({ alias: 'dma-button', transform: dmaButtonTypeAttribute })
    private buttonType: DmaButtonType;

    override get baseLayerColor() {
        return this.getBackgroundColorsForType(this.buttonType, 'base');
    }

    override get stateLayerColor() {
        return this.getBackgroundColorsForType(this.buttonType, 'state');
    }

    private getBackgroundColorsForType(type: DmaButtonType, layer: 'base' | 'state') {
        return containerColorsPerButtonType.get(type)[layer + 'Layer'];
    }
}
