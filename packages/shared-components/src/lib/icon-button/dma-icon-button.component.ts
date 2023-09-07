import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DmaStateComponent, StateColors } from '../state';

export type DmaIconButtonType = 'filled' | 'tonal' | 'outlined' | 'standard';

interface DmaButtonColorPerState {
    unselected: StateColors;
    selected: StateColors;
}

const containerColorsPerButtonType = new Map<DmaIconButtonType, DmaButtonColorPerState>([
    [
        'filled',
        {
            unselected: { baseLayer: 'transparent', stateLayer: 'transparent' },
            selected: { baseLayer: 'transparent', stateLayer: 'transparent' },
        },
    ],
    [
        'tonal',
        {
            unselected: { baseLayer: 'transparent', stateLayer: 'transparent' },
            selected: { baseLayer: 'transparent', stateLayer: 'transparent' },
        },
    ],
    [
        'outlined',
        {
            unselected: { baseLayer: 'transparent', stateLayer: 'transparent' },
            selected: { baseLayer: 'transparent', stateLayer: 'transparent' },
        },
    ],
    [
        'standard',
        {
            unselected: { baseLayer: 'transparent', stateLayer: 'var(--on-surface-variant)' },
            selected: { baseLayer: 'transparent', stateLayer: 'var(--primary)' },
        },
    ],
]);

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-icon-button]',
    templateUrl: './dma-icon-button.component.html',
    styleUrls: ['./dma-icon-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaIconButtonComponent extends DmaStateComponent implements OnInit {
    @Output() selectedChange = new EventEmitter<boolean>();

    @Input() set selected(selected: unknown) {
        this._selected = coerceBooleanProperty(selected);
        this.selectedChange.emit(this._selected);
    }
    get selected() {
        return this._selected;
    }
    @HostBinding('attr.selected') private _selected = false;

    @Output() toggleChange = new EventEmitter<boolean>();

    @Input() set toggle(toggle: unknown) {
        this._toggle = coerceBooleanProperty(toggle);
        this.toggleChange.emit(this._toggle);
    }
    get toggle() {
        return this._toggle;
    }
    @HostBinding('attr.toggle') private _toggle = false;

    @Input('dma-icon-button') set dmaButtonType(buttonType: DmaIconButtonType) {
        this.buttonType = buttonType;

        this.updateRenderedAttribute();
    }

    @HostBinding('attr.dma-icon-button')
    private buttonType: DmaIconButtonType = 'standard';

    ngOnInit() {
        this.updateRenderedAttribute();
    }

    private updateRenderedAttribute() {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        this.baseColor = containerColorsPerButtonType.get(this.buttonType)!.baseLayer;
        this.layerColor = containerColorsPerButtonType.get(this.buttonType)!.stateLayer;
    }

    private getLayerColor(layer: 'base' | 'state') {
        return containerColorsPerButtonType.get(this.buttonType)![this.toggle ? 'selected' : 'unselected'][
            layer + 'Layer'
        ] as string;
    }
}
