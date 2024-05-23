import { inject, Injectable } from '@angular/core';
import { CreateUserData, TokenData, UserModel } from '@dnd-mapp/data';
import { createId } from '@paralleldrive/cuid2';
import { BehaviorSubject, from, iif, map, of, switchMap, tap } from 'rxjs';
import { HttpRequestService, JWT_HELPER_SERVICE, SessionService, TextCodingService } from '../../../shared';
import { UserService } from '../../../user';

interface AuthorizeResponse {
    authorizationCode: string;
}

interface TokenRequestBody {
    codeVerifier: string;
    authorizationCode: string;
    username: string;
}

type SignUpData = Omit<CreateUserData, 'roles'>;

type SignUpResponse = Omit<UserModel, 'roles'>;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    readonly authenticatedUser$ = new BehaviorSubject<UserModel | null>(null);

    private readonly requestService = inject(HttpRequestService);
    private readonly textCodingService = inject(TextCodingService);
    private readonly jwtService = inject(JWT_HELPER_SERVICE);
    private readonly sessionService = inject(SessionService);
    private readonly userService = inject(UserService);

    private codeVerifier: string | null = null;

    initialize(accessToken: string) {
        return this.setAuthentication(accessToken);
    }

    /**
     * When a User logs in, requests an authorization code from the back-end which is base64 encoded.
     * With this code we can request an access token from the back-end.
     */
    login(username: string, password: string) {
        const data = { username: username, password: password };
        return this.generateCodeChallenge().pipe(
            switchMap(() => this.requestService.post('/authentication/login', data)),
            switchMap(() =>
                this.requestService.post<AuthorizeResponse>('/authentication/authorize', null, {
                    withState: true,
                })
            ),
            switchMap(({ authorizationCode }) => this.token(false, authorizationCode, username)),
            switchMap(({ access }) => this.setAuthentication(access))
        );
    }

    signOut() {
        return this.requestService.post<void>('/authentication/sign-out', null).pipe(
            switchMap(() => this.sessionService.retrieveSession()),
            tap(() => this.authenticatedUser$.next(null))
        );
    }

    signUp(userData: SignUpData) {
        return this.requestService.post<SignUpResponse, SignUpData>('/authentication/sign-up', userData);
    }

    token(refresh = false, authorizationCode?: string, username?: string) {
        return iif(
            () => refresh,
            this.requestService.post<{ access: string; refresh: string }, TokenRequestBody>(
                '/authentication/token?grantType=refreshToken',
                null
            ),
            this.requestService.post<{ access: string; refresh: string }, TokenRequestBody>(
                '/authentication/token?grantType=authorizationCode',
                {
                    codeVerifier: this.codeVerifier,
                    authorizationCode: authorizationCode,
                    username: username,
                }
            )
        ).pipe(switchMap((tokens) => this.sessionService.retrieveSession().pipe(map(() => tokens))));
    }

    private generateCodeChallenge() {
        this.codeVerifier = createId();

        return from(crypto.subtle.digest('SHA-256', this.textCodingService.encode(this.codeVerifier))).pipe(
            switchMap((codeChallenge) =>
                this.requestService.post<null, { codeChallenge: string }>(
                    '/authentication/challenge',
                    { codeChallenge: this.textCodingService.base64(codeChallenge) },
                    { withState: true }
                )
            )
        );
    }

    private setAuthentication(accessToken: string) {
        if (!accessToken) return of(null);
        const decodedToken = this.jwtService.decodeToken<TokenData>(accessToken);

        return this.userService
            .getById(decodedToken.sub)
            .pipe(tap((user) => this.authenticatedUser$.next(user as unknown as UserModel)));
    }
}
