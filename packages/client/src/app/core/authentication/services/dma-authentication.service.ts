import { Injectable } from '@angular/core';
import { DmaHttpRequestService } from '../../../shared';

@Injectable({
    providedIn: 'root',
})
export class DmaAuthenticationService {
    constructor(private httpRequestService: DmaHttpRequestService) {}

    login(username: string, password: string) {
        const data = { username, password };

        return this.httpRequestService.post('/authentication/login', data);
    }
}
