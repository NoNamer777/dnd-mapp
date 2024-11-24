import { inject, Injectable, signal } from '@angular/core';
import { User } from '@dnd-mapp/data';
import { switchMap, tap } from 'rxjs';
import { RequestService } from '../../shared';

const basePath = 'https://localhost.dndmapp.net:8080/authentication/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private readonly requestService = inject(RequestService);

    public readonly users = signal<User[]>([]);

    public getAll() {
        return this.requestService.get<User[]>(basePath).pipe(tap((users) => this.users.set(users)));
    }

    public edit(userId: string) {
        // TODO - Show modal with User's details.
        console.log(`Editing User with ID "${userId}"`);
    }

    public delete(userId: string) {
        // TODO - Show dialog to confirm action.
        // TODO - Once confirmed disable account instead of deleting it.
        // TODO - Don't allow removal of the only admin account
        return this.requestService.delete(`${basePath}/${userId}`).pipe(switchMap(() => this.getAll()));
    }
}
