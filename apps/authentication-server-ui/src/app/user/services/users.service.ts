import { inject, Injectable } from '@angular/core';
import { RequestService } from '../../shared';
import { User } from '../models';

const basePath = 'https://localhost.dndmapp.net:8080/authentication/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private readonly requestService = inject(RequestService);

    public getAll() {
        return this.requestService.get<User[]>(basePath);
    }
}
