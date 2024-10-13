import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

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
    standalone: true,
})
export class ButtonComponent {
    @Input({ alias: 'dma-button', transform: buttonTypeAttribute })
    @HostBinding('attr.dma-button-type')
    public buttonType: ButtonType = 'secondary';
}
