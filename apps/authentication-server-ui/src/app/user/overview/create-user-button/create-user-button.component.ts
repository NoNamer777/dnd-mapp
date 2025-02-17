import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, TranslatePipe } from '../../../shared';
import { PlusIcon } from '../../../shared/components/icons/plus/plus.icon';

@Component({
    selector: 'dma-create-user-button',
    templateUrl: './create-user-button.component.html',
    styleUrl: './create-user-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, PlusIcon, TranslatePipe],
})
export class CreateUserButtonComponent {}
