import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const ButtonTypes = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
} as const;

type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ButtonComponent {
    @Input({ alias: 'dma-button' }) buttonType: ButtonType = 'secondary';
}
