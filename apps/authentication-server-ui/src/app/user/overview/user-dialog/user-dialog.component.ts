import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Roles, User } from '@dnd-mapp/data';
import {
    ButtonComponent,
    CheckboxComponent,
    DIALOG_DATA,
    DialogConfig,
    DialogContentComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef,
    IconsModule,
    InputComponent,
} from '../../../shared';
import {
    emailErrorMap,
    minPasswordLength,
    minUsernameLength,
    minUserRoles,
    passwordErrorMap,
    usernameErrorMap,
} from './models';

export const userDialogConfig: DialogConfig = {
    width: '32rem',
    height: '28rem',
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
    imports: [
        ReactiveFormsModule,
        IconsModule,
        DialogHeaderComponent,
        DialogFooterComponent,
        ButtonComponent,
        DialogContentComponent,
        InputComponent,
        CheckboxComponent,
    ],
})
export class UserDialogComponent {
    protected readonly dialogData = inject<UserDialogData>(DIALOG_DATA);
    private readonly formBuilder = inject(FormBuilder);
    private readonly dialogRef = inject(DialogRef<UserDialogComponent>);

    protected readonly usernameErrorMap = usernameErrorMap;
    protected readonly passwordErrorMap = passwordErrorMap;
    protected readonly emailErrorMap = emailErrorMap;

    protected readonly form = this.formBuilder.group({
        id: [this.user.id ?? null, this.editMode ? [Validators.required] : []],
        username: [this.user.username ?? null, [Validators.required, Validators.minLength(minUsernameLength)]],
        email: [this.user.email ?? null, [Validators.required, Validators.email]],
        roles: [this.user.roles ?? [Roles.PLAYER], [Validators.minLength(minUserRoles)]],
        skipEmailVerification: [{ value: false, disabled: this.editMode }],
        ...(this.editMode ? {} : { password: [null, [Validators.required, Validators.minLength(minPasswordLength)]] }),
    });

    protected get editMode() {
        return this.dialogData.edit;
    }

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
        this.dialogRef.close(this.form.value);
    }

    private get user() {
        return this.dialogData.user;
    }
}
