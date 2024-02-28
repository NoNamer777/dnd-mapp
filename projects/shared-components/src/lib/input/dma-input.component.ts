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
import { DmaIconComponent } from '../icons';
import { AnimationState, AutoComplete, DmaInputType, dmaInputValueAccessorProvider } from './dma-input.models';
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
})
export class DmaInputComponent implements OnInit, AfterContentInit {
    @Input() @HostBinding('class.disabled') disabled = false;

    @Input() @HostBinding('class.readonly') readonly = false;

    @Input() inputType: DmaInputType = 'text';

    @Input() autocomplete: AutoComplete = 'off';

    @Input() autofocus = false;

    @Input() size = 1;

    @Input() label?: string;

    @Input() value: string;

    @Input() supportingText: string;

    @Input() @HostBinding('class.invalid') invalid = false;

    @Input() errorMessage: string;

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
