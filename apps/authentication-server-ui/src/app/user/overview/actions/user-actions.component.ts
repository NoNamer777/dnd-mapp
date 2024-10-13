import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ButtonComponent, IconsModule } from '../../../shared';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'dma-user-actions',
    templateUrl: './user-actions.component.html',
    styleUrl: './user-actions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent, IconsModule],
})
export class UserActionsComponent {
    private readonly usersService = inject(UsersService);

    @Input() public userId: string;

    protected onEdit() {
        this.usersService.edit(this.userId);
    }

    protected onDelete() {
        this.usersService.delete(this.userId);
    }
}
