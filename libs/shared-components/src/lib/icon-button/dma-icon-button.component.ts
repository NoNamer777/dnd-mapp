import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    inject,
    Input,
    Output,
} from '@angular/core';
import { DmaStateDirective, StateColors } from '../state';
import { DmaTooltipDirective, DmaTooltipModule } from '../tooltip';

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
            default: { baseLayer: 'transparent', stateLayer: 'var(--inverse-surface)' },
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
    hostDirectives: [
        {
            directive: DmaTooltipDirective,
            inputs: [
                'dmaTooltip: dmaIconButtonLabel',
                'dmaTooltipPosition: dmaIconButtonLabelPosition',
                'disabled: dmaDisableTooltip',
            ],
        },
    ],
    standalone: true,
    imports: [CommonModule, DmaStateDirective, DmaTooltipModule],
})
export class DmaIconButtonComponent extends DmaStateDirective {
    private readonly tooltip = inject(DmaTooltipDirective);

    get selected() {
        return this._selected;
    }
    @Input() set selected(selected: boolean | string) {
        this._selected = coerceBooleanProperty(selected);
    }
    protected _selected = false;

    @Output() selectedChange = new EventEmitter<boolean>();

    get toggle() {
        return this._toggle;
    }
    @Input() set toggle(toggle: boolean | string) {
        this._toggle = coerceBooleanProperty(toggle);
    }
    private _toggle = false;

    @Input('dma-icon-button') set dmaButtonType(buttonType: DmaIconButtonType | string) {
        if (buttonType === '') return;

        this.buttonType = buttonType as DmaIconButtonType;
    }
    @HostBinding('attr.dma-icon-button')
    private buttonType: DmaIconButtonType = 'standard';

    get disabled(): boolean {
        return this._disabled;
    }
    @Input() set disabled(value: string | unknown) {
        this._disabled = coerceBooleanProperty(value);
        this.tooltip.disabled = this._disabled;
    }
    private _disabled = false;

    @Input()
    @HostBinding('attr.dmaIconButtonLabel')
    dmaIconButtonLabel?: string;

    @HostBinding('attr.selected') get isSelected() {
        return this.selected ? '' : undefined;
    }

    @HostBinding('attr.toggle') get isToggled() {
        return this.toggle ? '' : undefined;
    }

    @HostBinding('attr.dmaDisableTooltip')
    @HostBinding('attr.disabled')
    get IsDisabled() {
        return this.disabled ? '' : undefined;
    }

    override get baseLayerColor() {
        return this.getLayerColor('base');
    }

    override get stateLayerColor() {
        return this.getLayerColor('state');
    }

    @HostListener('click')
    onClick() {
        if (!this.toggle) return;

        this._selected = !this._selected;
        this.selectedChange.emit(this._selected);
    }

    private getLayerColor(layer: 'base' | 'state') {
        const toggleState = this.toggle ? (this._selected ? 'selected' : 'unselected') : 'default';

        return containerColorsPerButtonType.get(this.buttonType)[toggleState][layer + 'Layer'];
    }
}
