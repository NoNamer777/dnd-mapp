import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@dnd-mapp/data';
import { IconsModule } from '../../../shared';
import { DeleteUserButtonComponent } from './delete-user-button/delete-user-button.component';
import { EditUserButtonComponent } from './edit-user-button/edit-user-button.component';

@Component({
    selector: 'dma-user-actions',
    templateUrl: './user-actions.component.html',
    styleUrl: './user-actions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconsModule, EditUserButtonComponent, DeleteUserButtonComponent],
})
export class UserActionsComponent {
    @Input() public user: User;

    @Input() public disabled = false;

    @Output() public readonly selectUser = new EventEmitter<User>();

    protected onEdit() {
        this.selectUser.emit(this.user);
    }

    protected onDelete() {
        this.selectUser.emit(this.user);
    }
}
