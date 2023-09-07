import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DmaStateComponent } from '../state';

export type DmaIconButtonType = 'filled' | 'tonal' | 'outlined';

const containerColorsPerButtonType = new Map<DmaIconButtonType, { baseLayer: string; stateLayer: string }>([
    ['filled', { baseLayer: 'var(--primary)', stateLayer: 'var(--on-primary)' }],
    ['tonal', { baseLayer: 'var(--secondary-container)', stateLayer: 'var(--on-secondary-container)' }],
    ['outlined', { baseLayer: 'var(--surface)', stateLayer: 'var(--primary)' }],
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

    @Input() set contained(contained: unknown) {
        this._contained = coerceBooleanProperty(contained);
    }
    get contained() {
        return this._contained;
    }
    @HostBinding('attr.contained')
    private _contained = false;

    @Input('dma-icon-button') set dmaButtonType(buttonType: DmaIconButtonType) {
        this.buttonType = buttonType;

        this.updateRenderedAttribute();
    }

    @HostBinding('attr.dma-icon-button')
    private buttonType: DmaIconButtonType;

    ngOnInit() {
        this.updateRenderedAttribute();
    }

    private updateRenderedAttribute() {
        if (!this.contained) return;

        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        this.baseColor = containerColorsPerButtonType.get(this.buttonType)!.baseLayer;
        this.layerColor = containerColorsPerButtonType.get(this.buttonType)!.stateLayer;
    }
}
