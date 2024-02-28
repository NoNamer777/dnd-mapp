import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
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
    DmaInputType,
    DmaInputTypes,
    dmaInputTypeAttribute,
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
export class DmaInputComponent implements OnInit, AfterContentInit, ControlValueAccessor {
    @Input() @HostBinding('class.disabled') disabled = false;

    @Input() @HostBinding('class.readonly') readonly = false;

    @Input({ transform: dmaInputTypeAttribute, required: true }) inputType: DmaInputType = DmaInputTypes.TEXT;

    @Input() autocomplete: AutoComplete = 'off';

    @Input() autofocus = false;

    @Input() size = 1;

    @Input() label?: string;

    @Input({ required: true }) forLabel: string;

    @Input() value: string = null;

    @Input() supportingText: string;

    @Input() errorMessage: string;

    @Output() valueChange = new EventEmitter<string>();

    @HostBinding('class.focused') protected focus = false;

    protected animationState: AnimationState;

    @ViewChild('input') protected inputElement: ElementRef<HTMLInputElement>;

    @HostBinding('class.with-leading-icon') protected isContainingLeadingIcon = false;

    @ContentChildren(DmaIconComponent, { read: ElementRef }) private readonly icons: QueryList<ElementRef<HTMLElement>>;

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

    @HostBinding('class.invalid') get invalid() {
        return isInvalid(this.elementRef.nativeElement.className);
    }

    ngOnInit() {
        this.animationState = this.value ? 'populated' : 'unpopulated';
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
        this.onChange(value);
    }

    protected onBlur() {
        this.animationState = this.value ? 'populated' : 'unpopulated';
        this.focus = false;

        this.onTouched();
    }

    protected onClick() {
        this.inputElement.nativeElement.focus();
    }

    protected onFocus() {
        if (this.disabled || this.readonly) return;
        this.focus = true;
        this.animationState = 'populated';
    }

    protected getLabelWidth(width: number) {
        return `${width}px`;
    }

    protected onValueChange(changeEvent: Event) {
        this.value = (changeEvent.target as HTMLInputElement).value;
        this.valueChange.emit(this.value);
        this.writeValue(this.value);
    }

    private containsIcon() {
        this.isContainingLeadingIcon = this.icons.some((iconElem) =>
            iconElem.nativeElement.className.includes('leading-icon')
        );
    }
}
