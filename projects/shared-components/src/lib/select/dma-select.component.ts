import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DmaIconComponent, DmaIconName, DmaIcons } from '../icons';
import { DmaInputComponent } from '../input';
import { DmaMenuModule, DmaMenuTriggerDirective } from '../menu';
import { DmaOptionComponent } from './option/dma-option.component';

@Component({
    selector: 'dma-select',
    templateUrl: './dma-select.component.html',
    styleUrl: './dma-select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, DmaMenuModule, DmaInputComponent, DmaIconComponent],
})
export class DmaSelectComponent implements AfterViewInit, OnDestroy {
    @Input({ required: true }) forLabel: string;

    @Input() label?: string;

    @Input() @HostBinding('attr.value') value: unknown = null;

    @Output() valueChange = new EventEmitter<unknown>();

    @Input({ transform: booleanAttribute }) set disabled(disabled: boolean) {
        this._disabled = disabled;

        if (this.menuTrigger) {
            this.menuTrigger.disabled = disabled;
        }
    }
    get disabled() {
        return this._disabled;
    }
    @HostBinding('attr.disabled') private _disabled = false;

    @ViewChild(DmaMenuTriggerDirective) private readonly menuTrigger: DmaMenuTriggerDirective;

    @ViewChild(CdkOverlayOrigin) private readonly overlayOrigin: CdkOverlayOrigin;

    @ViewChild(DmaInputComponent) private readonly input: DmaInputComponent;

    @ContentChildren(DmaOptionComponent) private readonly options: QueryList<DmaOptionComponent>;

    private readonly destroy$ = new Subject<void>();

    private selectedOption: DmaOptionComponent;

    protected getIcon(isOpen: boolean): DmaIconName {
        return isOpen ? DmaIcons.CARET_UP : DmaIcons.CARET_DOWN;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit() {
        this.menuTrigger.overlayOrigin = this.overlayOrigin;
        this.menuTrigger.disabled = this.disabled;

        this.listenToOptionSelections();
        this.selectOptionFromValue();
    }

    private listenToOptionSelections() {
        this.options.forEach((option) =>
            option.selected$.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.menuTrigger.open = false;
                this.setValueFromOption(option);
            })
        );
    }

    private setValueFromOption(option: DmaOptionComponent) {
        this.options.forEach((option) => option.resetStateLayer());

        this.setSelectedOption(option);

        this.valueChange.emit(this.value);
    }

    private selectOptionFromValue() {
        const option = this.options.find((option) => option.value === this.value);

        if (!option) return;
        this.setSelectedOption(option);
    }

    private setSelectedOption(option: DmaOptionComponent) {
        if (this.selectedOption) {
            this.selectedOption.selected = false;
        }
        this.value = option.value;
        this.selectedOption = option;

        this.input.value = option.label;
    }
}
