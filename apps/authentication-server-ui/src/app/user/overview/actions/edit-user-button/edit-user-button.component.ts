import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonComponent, IconsModule, TooltipModule, TranslatePipe } from '../../../../shared';
import { UsersOverviewStore } from '../../../services/users-overview-store';

@Component({
    selector: 'dma-edit-user-button',
    templateUrl: './edit-user-button.component.html',
    styleUrl: './edit-user-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TooltipModule, ButtonComponent, IconsModule, TranslatePipe],
})
export class EditUserButtonComponent {
    protected readonly usersOverviewStore = inject(UsersOverviewStore);

    @Input() public disabled = false;

    @Output() public readonly editUser = new EventEmitter<void>();

    protected onEdit() {
        this.editUser.emit();
        this.usersOverviewStore.edit();
    }
}
