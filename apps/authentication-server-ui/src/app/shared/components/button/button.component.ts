import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    signal,
    ViewChild,
} from '@angular/core';
import { IconsModule } from '../icons';

const ButtonTypes = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger',
} as const;

export type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

function buttonTypeAttribute(value: string) {
    return Object.values(ButtonTypes).find((buttonType) => buttonType === value) ?? 'secondary';
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconsModule],
})
export class ButtonComponent implements AfterViewInit {
    @Input({ alias: 'dma-button', transform: buttonTypeAttribute })
    @HostBinding('attr.dma-button-type')
    public buttonType: ButtonType = 'secondary';

    @Input({ transform: booleanAttribute })
    public set processing(processing: boolean) {
        this.disabled = this._processing = processing;
    }

    public get processing() {
        return this._processing;
    }

    private _processing = false;

    @Input({ transform: booleanAttribute })
    public disabled = false;

    @HostBinding('attr.disabled')
    protected get isDisabled() {
        return this.disabled ? '' : undefined;
    }

    @ViewChild('content') private readonly contentElement: ElementRef<HTMLDivElement>;

    protected readonly contentWidth = signal<string>(null);

    public ngAfterViewInit() {
        this.contentWidth.set(getComputedStyle(this.contentElement.nativeElement).width);
    }
}
