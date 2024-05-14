import { Injectable } from '@angular/core';
import { UserModel } from '@dnd-mapp/data';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { HttpRequestService } from '../../shared';
import { UserResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private readonly requestService: HttpRequestService) {}

    getById(userId: string) {
        return this.requestService
            .get<UserResponse>(`/api/user/${userId}`)
            .pipe(map((data) => plainToInstance(UserModel, data)));
    }
}
