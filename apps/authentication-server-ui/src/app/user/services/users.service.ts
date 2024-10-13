import { inject, Injectable } from '@angular/core';
import { User } from '@dnd-mapp/data';
import { RequestService } from '../../shared';

const basePath = 'https://localhost.dndmapp.net:8080/authentication/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private readonly requestService = inject(RequestService);

    public getAll() {
        return this.requestService.get<User[]>(basePath);
    }

    public edit(userId: string) {
        // TODO - Show modal with User's details.
        console.log(`Editing User with ID "${userId}"`);
    }

    public delete(userId: string) {
        // TODO - Show dialog to confirm action.
        // TODO - Once confirmed disable account instead of deleting it.
        console.log(`Deleting User with ID "${userId}"`);
    }
}
