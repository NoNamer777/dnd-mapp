import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    afterRender,
    AfterRenderPhase,
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    numberAttribute,
    Output,
    QueryList,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { isInvalid } from '../forms';
import { DmaIconComponent } from '../icons';
import {
    AnimationState,
    AutoComplete,
    AutoCompleteValues,
    dmaAutoCompleteAttribute,
    DmaInputType,
    dmaInputTypeAttribute,
    DmaInputTypes,
    dmaInputValueAccessorProvider,
} from './dma-input.models';
import { inputBorderAnimation } from './input-border.animation';
import { inputLabelAnimation } from './input-label.animation';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'dma-input',
    templateUrl: './dma-input.component.html',
    styleUrl: './dma-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [inputLabelAnimation, inputBorderAnimation],
    standalone: true,
    imports: [CommonModule, DmaIconComponent],
    providers: [dmaInputValueAccessorProvider],
})
export class DmaInputComponent implements AfterContentInit, AfterViewInit, ControlValueAccessor {
    @Input({ transform: booleanAttribute }) @HostBinding('class.disabled') disabled = false;

    @Input({ transform: booleanAttribute }) @HostBinding('class.readonly') readonly = false;

    @Input({ transform: dmaInputTypeAttribute, required: true }) inputType: DmaInputType = DmaInputTypes.TEXT;

    @Input({ transform: dmaAutoCompleteAttribute }) autocomplete: AutoComplete = AutoCompleteValues.OFF;

    @Input({ transform: booleanAttribute }) autofocus = false;

    @Input({ transform: numberAttribute }) size = 1;

    @Input() label?: string;

    @Input({ required: true }) forLabel: string;

    @Input() set value(value: string) {
        this._value = value;

        this.valueChange.emit(this.value);

        this.onChange(value);
        this.changeDetectorRef.markForCheck();
    }
    get value() {
        return this._value;
    }
    private _value: string = null;

    @Input() supportingText: string;

    @Input() errorMessage: string;

    @Output() valueChange = new EventEmitter<string>();

    @HostBinding('class.focused') protected focus = false;

    @HostBinding('class.with-leading-icon') protected isContainingLeadingIcon = false;

    protected labelWidth = '0px';

    @ContentChildren(DmaIconComponent, { read: ElementRef }) private readonly icons: QueryList<ElementRef<HTMLElement>>;

    @ViewChild('input') private readonly inputElement: ElementRef<HTMLInputElement>;

    @ViewChild('labelElement') private readonly labelElement: ElementRef<HTMLElement>;

    private readonly elementRef = inject(ElementRef);

    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    @HostBinding('class.invalid')
    protected invalid = false;

    protected get animationState(): AnimationState {
        return this.value || this.focus ? 'populated' : 'unpopulated';
    }

    constructor() {
        afterRender(
            () => {
                const invalid = isInvalid(this.elementRef.nativeElement.className);

                if (invalid === this.invalid) return;
                this.invalid = invalid;
                this.changeDetectorRef.markForCheck();
            },
            { phase: AfterRenderPhase.Write }
        );
    }

    ngAfterViewInit() {
        this.labelWidth = `${this.labelElement.nativeElement.clientWidth}px`;
        this.changeDetectorRef.markForCheck();
    }

    ngAfterContentInit() {
        this.containsIcon();
    }

    onChange = (_value: string) => {
        // Do nothing
    };

    onTouched = () => {
        // Do nothing
    };

    registerOnChange(fn: (value: string) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    writeValue(value: string) {
        this.value = value;
    }

    protected onBlur() {
        this.focus = false;
        this.onTouched();
    }

    protected onClick() {
        this.inputElement.nativeElement.focus();
    }

    protected onFocus() {
        if (this.disabled || this.readonly) return;
        this.focus = true;
    }

    protected onValueChange(changeEvent: Event) {
        this.value = (changeEvent.target as HTMLInputElement).value;
    }

    private containsIcon() {
        this.isContainingLeadingIcon = this.icons.some((iconElem) =>
            iconElem.nativeElement.className.includes('leading-icon')
        );
    }
}
