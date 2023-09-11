import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DmaStateComponent, StateColors } from '../state';

export type DmaIconButtonType = 'filled' | 'tonal' | 'outlined' | 'standard';

interface DmaButtonColorPerState {
    default: StateColors;
    unselected: StateColors;
    selected: StateColors;
}

const containerColorsPerButtonType = new Map<DmaIconButtonType, DmaButtonColorPerState>([
    [
        'filled',
        {
            default: { baseLayer: 'var(--primary)', stateLayer: 'var(--on-primary)' },
            unselected: { baseLayer: 'var(--surface-container-highest)', stateLayer: 'var(--primary)' },
            selected: { baseLayer: 'var(--primary)', stateLayer: 'var(--on-primary)' },
        },
    ],
    [
        'tonal',
        {
            default: { baseLayer: 'var(--secondary-container)', stateLayer: 'var(--on-secondary-container)' },
            unselected: { baseLayer: 'var(--surface-container-highest)', stateLayer: 'var(--on-surface-variant)' },
            selected: { baseLayer: 'var(--secondary-container)', stateLayer: 'var(--on-secondary-container)' },
        },
    ],
    [
        'outlined',
        {
            default: { baseLayer: 'transparent', stateLayer: 'transparent' },
            unselected: { baseLayer: 'transparent', stateLayer: 'var(--on-surface-variant)' },
            selected: { baseLayer: 'var(--inverse-surface)', stateLayer: 'var(--inverse-surface)' },
        },
    ],
    [
        'standard',
        {
            default: { baseLayer: 'transparent', stateLayer: 'var(--on-surface-variant)' },
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

    @HostBinding('attr.selected')
    get selected() {
        return this._selected ? '' : undefined;
    }
    protected _selected = false;

    @Output() toggleChange = new EventEmitter<boolean>();

    @Input() set toggle(toggle: unknown) {
        this._toggle = coerceBooleanProperty(toggle);
        this.toggleChange.emit(this._toggle);
    }
    get toggle() {
        return this._toggle;
    }
    private _toggle = false;

    @HostBinding('attr.toggle') get isToggled() {
        return this.toggle ? '' : undefined;
    }

    @Input('dma-icon-button') set dmaButtonType(buttonType: DmaIconButtonType) {
        this.buttonType = buttonType;

        this.updateRenderedAttribute();
    }

    @HostBinding('attr.dma-icon-button')
    private buttonType: DmaIconButtonType = 'standard';

    ngOnInit() {
        this.updateRenderedAttribute();
    }

    @HostListener('click')
    onClick() {
        if (!this.toggle) return;

        this._selected = !this._selected;
        this.selectedChange.emit(this._selected);

        this.updateRenderedAttribute();
    }

    private updateRenderedAttribute() {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        this.baseColor = this.getLayerColor('base');
        this.layerColor = this.getLayerColor('state');
    }

    private getLayerColor(layer: 'base' | 'state') {
        const toggleState = this.toggle ? (this._selected ? 'selected' : 'unselected') : 'default';

        return containerColorsPerButtonType.get(this.buttonType)[toggleState][layer + 'Layer'];
    }
}
