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
}
