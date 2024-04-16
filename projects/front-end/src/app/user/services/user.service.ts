import { Injectable } from '@angular/core';
import { DmaHttpRequestService } from '../../shared';
import { UserResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private readonly requestService: DmaHttpRequestService) {}

    getById(userId: string) {
        return this.requestService.get<UserResponse>(`/api/user/${userId}`);
    }
}
