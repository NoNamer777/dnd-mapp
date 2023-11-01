import { Injectable } from '@angular/core';
import { DmaHttpRequestService } from '../../shared';
import { UserResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private readonly requestService: DmaHttpRequestService) {}

    getById(id: number) {
        return this.requestService.get<UserResponse>(`/api/user/${id}`);
    }
}
