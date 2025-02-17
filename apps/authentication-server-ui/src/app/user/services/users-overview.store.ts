import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@dnd-mapp/data';
import { tap } from 'rxjs';
import { DialogService } from '../../shared';
import { UserDialogComponent, userDialogConfig } from '../overview/user-dialog/user-dialog.component';
import { UsersService } from './users.service';

@Injectable()
export class UsersOverviewStore {
    private readonly usersService = inject(UsersService);
    protected readonly dialogService = inject(DialogService);

    public readonly selectedUser = signal<User>(null);

    public readonly processing = signal(false);

    public readonly lockActions = computed(() => Boolean(this.selectedUser()) && this.processing());

    public delete() {
        return this.usersService.delete(this.selectedUser());
    }

    public edit() {
        const dialogRef = this.dialogService.open(UserDialogComponent, {
            ...userDialogConfig,
            data: {
                edit: true,
                user: this.selectedUser(),
            },
        });

        return dialogRef.afterClose().pipe(tap((updatedUser) => console.log({ updatedUser })));
    }
}
