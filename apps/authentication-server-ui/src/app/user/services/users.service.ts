import { inject, Injectable, signal } from '@angular/core';
import { User } from '@dnd-mapp/data';
import { EMPTY, switchMap, tap } from 'rxjs';
import { DialogService, RequestService } from '../../shared';
import {
    DeleteUserDialogComponent,
    deleteUserDialogConfig,
} from '../overview/actions/delete-user-dialog/delete-user-dialog.component';

const basePath = 'https://localhost.dndmapp.net:8080/authentication/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private readonly requestService = inject(RequestService);
    private readonly dialogService = inject(DialogService);

    public readonly users = signal<User[]>([]);

    public getAll() {
        return this.requestService.get<User[]>(basePath).pipe(tap((users) => this.users.set(users)));
    }

    public edit(userId: string) {
        // TODO - Show modal with User's details.
        console.log(`Editing User with ID "${userId}"`);
    }

    public delete(user: User) {
        // TODO server - Once confirmed disable account instead of deleting it.
        // TODO server - Don't allow removal of the only admin account
        const dialogRef = this.dialogService.open<DeleteUserDialogComponent, User, boolean>(DeleteUserDialogComponent, {
            ...deleteUserDialogConfig,
            data: user,
        });

        return dialogRef
            .afterClose()
            .pipe(switchMap((proceed) => (proceed ? this.requestService.delete(`${basePath}/${user.id}`) : EMPTY)));
    }
}
