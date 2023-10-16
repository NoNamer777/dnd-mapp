import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

export enum DmaButtonVariants {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info',
    DARK = 'dark',
    LIGHT = 'light',
    LINK = 'link',
}

export type DmaButtonVariant = (typeof DmaButtonVariants)[keyof typeof DmaButtonVariants];

const BASE_HOST_CLASS = 'btn';

function coerceDmaButtonVariantProperty(value: unknown): DmaButtonVariant {
    if (typeof value !== 'string') {
        return DmaButtonVariants.PRIMARY;
    }
    return Object.values(DmaButtonVariants).find((variant) => variant === value) || DmaButtonVariants.PRIMARY;
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './dma-button.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaButtonComponent implements OnInit {
    @HostBinding('class') hostClass = 'btn btn-primary';

    get buttonVariant() {
        return this._buttonVariant;
    }

    @Input('dma-button') set buttonVariant(variant: unknown) {
        this._buttonVariant = coerceDmaButtonVariantProperty(variant);
        this.buildBtnClass();
    }

    @HostBinding('attr.dma-button') private _buttonVariant: DmaButtonVariant = DmaButtonVariants.PRIMARY;

    get outlined() {
        return this._outlined;
    }

    @Input() set outlined(outlined: BooleanInput) {
        this._outlined = coerceBooleanProperty(outlined);
        this.buildBtnClass();
    }
    private _outlined = false;

    get small() {
        return this._small;
    }

    @Input() set small(small: BooleanInput) {
        this._small = coerceBooleanProperty(small);
        this.buildBtnClass();
    }
    private _small = false;

    get large() {
        return this._large;
    }

    @Input() set large(large: BooleanInput) {
        this._large = coerceBooleanProperty(large);
        this.buildBtnClass();
    }
    private _large = false;

    get toggle() {
        return this._toggle;
    }

    @Input() set toggle(toggle: BooleanInput) {
        this._toggle = coerceBooleanProperty(toggle);
    }
    private _toggle = false;

    @HostBinding('attr.data-bs-toggle') toggleEnabled: string | undefined;

    ngOnInit() {
        this.toggleEnabled = this.toggle ? 'button' : undefined;
    }

    private buildBtnClass() {
        let btnClass = BASE_HOST_CLASS;

        if (this.outlined) {
            btnClass += ` btn-outline-${this.buttonVariant}`;
        } else {
            btnClass += ` btn-${this.buttonVariant}`;
        }
        if (this.small) {
            btnClass += ' btn-sm';
        }
        if (this.large) {
            btnClass += ' btn-lg';
        }
        this.hostClass = btnClass;
    }
}
