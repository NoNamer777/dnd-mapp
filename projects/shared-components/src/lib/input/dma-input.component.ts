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
import { DmaIconComponent, DmaIconsModule } from '@dnd-mapp/shared-components';
import { inputBorderAnimation } from './input-border.animation';
import { inputLabelAnimation } from './input-label.animation';

type DmaInputType = 'text' | 'password' | 'email' | 'search' | 'tel';

type AutoComplete =
    | 'off'
    | 'on'
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'shipping'
    | 'billing'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level4'
    | 'address-level3'
    | 'address-level2'
    | 'address-level1'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-extension'
    | 'impp'
    | 'url'
    | 'photo'
    | 'webauthn';

type AnimationState = 'populated' | 'unpopulated';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'dma-input',
    templateUrl: './dma-input.component.html',
    styleUrl: './dma-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [inputLabelAnimation, inputBorderAnimation],
    standalone: true,
    imports: [CommonModule, DmaIconsModule],
})
export class DmaInputComponent implements OnInit, AfterContentInit {
    @Input() @HostBinding('class.disabled') disabled = false;

    @Input() @HostBinding('class.readonly') readonly = false;

    @Input() inputType: DmaInputType = 'text';

    @Input() autocomplete: AutoComplete = 'off';

    @Input() autofocus = false;

    @Input() label?: string;

    @Input() value: string;

    @Input() supportingText: string;

    @Input() @HostBinding('class.invalid') invalid = false;

    @Output() valueChange = new EventEmitter<string>();

    @HostBinding('class.focused') protected focus = false;

    protected animationState: AnimationState;

    @ViewChild('input') protected inputElement: ElementRef<HTMLInputElement>;

    @ContentChildren(DmaIconComponent, { read: ElementRef }) private readonly icons: QueryList<ElementRef<HTMLElement>>;

    @HostBinding('class.with-leading-icon') protected isContainingLeadingIcon = false;

    ngOnInit() {
        this.animationState = this.value ? 'populated' : 'unpopulated';
    }

    ngAfterContentInit() {
        this.containsIcon();
    }

    protected onClick() {
        this.inputElement.nativeElement.focus();
    }

    protected onFocus() {
        if (this.disabled || this.readonly) return;
        this.focus = true;
        this.animationState = 'populated';
    }

    protected blur() {
        this.animationState = this.value ? 'populated' : 'unpopulated';
        this.focus = false;
    }

    protected getLabelWidth(width: number) {
        return `${width}px`;
    }

    protected onValueChange(changeEvent: Event) {
        this.value = (changeEvent.target as HTMLInputElement).value;
        this.valueChange.emit(this.value);
    }

    private containsIcon() {
        this.isContainingLeadingIcon = this.icons.some((iconElem) =>
            iconElem.nativeElement.className.includes('leading-icon')
        );
    }
}
