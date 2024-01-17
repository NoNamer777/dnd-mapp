import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateUserData, User } from '@dnd-mapp/data';
import { BehaviorSubject } from 'rxjs';
import { DmaHttpRequestService, JWT_HELPER_SERVICE, StorageKey, StorageService } from '../../../shared';
import { UserService } from '../../../user';

@Injectable({ providedIn: 'root' })
export class DmaAuthenticationService {
    authenticatedUser$ = new BehaviorSubject<User | null>(null);

    constructor(
        private readonly httpRequestService: DmaHttpRequestService,
        private readonly localStorageService: StorageService,
        @Inject(JWT_HELPER_SERVICE) private readonly jwtHelperService: JwtHelperService,
        private readonly userService: UserService
    ) {
        this.initialize();
    }

    login(username: string, password: string) {
        const data = { username, password };

        return this.httpRequestService.post('/authentication/login', data);
    }

    signUp(userData: CreateUserData) {
        return this.httpRequestService.post('/authentication/sign-up', userData);
    }

    private initialize() {
        const token = this.token;

        if (!token) {
            this.authenticatedUser$.next(null);
            return;
        }

        try {
            const decodedToken: { sub: string } = this.jwtHelperService.decodeToken(token)!;

            this.userService.getById(Number(decodedToken.sub)).subscribe({
                next: (user) => this.authenticatedUser$.next(user as User),
            });
        } catch (error) {
            this.authenticatedUser$.next(null);
        }
    }

    private get token() {
        return this.localStorageService.getItem(StorageKey.ACCESS_TOKEN);
    }
}
