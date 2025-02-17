import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '@dnd-mapp/data';
import {
    ButtonComponent,
    DIALOG_DATA,
    DialogConfig,
    DialogContentComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef,
} from '../../../shared';

export const userDialogConfig: DialogConfig = {
    width: '20rem',
    height: '20rem',
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-dark-backdrop',
};

export interface UserDialogData {
    user: User;
    edit: boolean;
}

@Component({
    selector: 'dma-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrl: './user-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'dma-dialog-container',
    },
    imports: [DialogHeaderComponent, DialogFooterComponent, ButtonComponent, DialogContentComponent],
})
export class UserDialogComponent {
    private readonly dialogRef = inject(DialogRef<UserDialogComponent, User>);

    protected readonly dialogData = inject<UserDialogData>(DIALOG_DATA);

    protected get title() {
        return this.editMode ? `Edit ${this.dialogData.user.username}` : 'New User';
    }

    protected get confirmBtnLabel() {
        return this.editMode ? 'Save' : 'Create';
    }

    protected onCancel() {
        this.dialogRef.close();
    }

    protected onConfirm() {
        this.dialogRef.close(this.dialogData.user);
    }

    private get editMode() {
        return this.dialogData.edit;
    }
}
