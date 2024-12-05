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
} from '../../../../shared';

export const deleteUserDialogConfig: DialogConfig = {
    width: '20rem',
    height: '10rem',
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-dark-backdrop',
};

@Component({
    selector: 'dma-delete-user-dialog',
    templateUrl: './delete-user-dialog.component.html',
    styleUrl: './delete-user-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'dma-dialog-container',
    },
    standalone: true,
    imports: [DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, ButtonComponent],
})
export class DeleteUserDialogComponent {
    private readonly dialogRef = inject(DialogRef<DeleteUserDialogComponent, boolean>);

    protected readonly user = inject<User>(DIALOG_DATA);

    protected onCancel() {
        this.dialogRef.close(false);
    }

    protected onDelete() {
        this.dialogRef.close(true);
    }
}
