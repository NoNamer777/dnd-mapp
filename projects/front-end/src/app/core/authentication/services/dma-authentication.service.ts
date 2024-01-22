import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateUserData, UserModel } from '@dnd-mapp/data';
import { nanoid } from 'nanoid';
import { BehaviorSubject, from, map, switchMap, tap } from 'rxjs';
import { CookieService, DmaHttpRequestService, JWT_HELPER_SERVICE, TextCodingService } from '../../../shared';

interface AuthorizeResponse {
    authorizationCode: string;
}

interface TokenRequestBody {
    codeVerifier: string;
    authorizationCode: string;
    username: string;
}

type SignUpResponse = Omit<UserModel, 'roles'>;

interface IdentityTokenData {
    jti: string;
    sub: number;
    clt: string;
    nbf: number;
    iat: number;
    exp: number;
    user: UserModel;
}

@Injectable({ providedIn: 'root' })
export class DmaAuthenticationService {
    authenticatedUser$ = new BehaviorSubject<UserModel | null>(null);

    private codeVerifier: string | null = null;

    constructor(
        private readonly requestService: DmaHttpRequestService,
        private readonly textCodingService: TextCodingService,
        private readonly cookieService: CookieService,
        @Inject(JWT_HELPER_SERVICE) private readonly jwtService: JwtHelperService
    ) {
        this.setAuthentication();
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
            map((response) => response.authorizationCode),
            switchMap((authorizationCode) =>
                this.requestService.post<void, TokenRequestBody>('/authentication/token', {
                    codeVerifier: this.codeVerifier!,
                    authorizationCode: authorizationCode,
                    username: username,
                })
            ),
            tap(() => this.setAuthentication())
        );
    }

    signUp(userData: CreateUserData) {
        return this.requestService.post<SignUpResponse, CreateUserData>('/authentication/sign-up', userData);
    }

    private generateCodeChallenge() {
        this.codeVerifier = nanoid(32);

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

    private setAuthentication() {
        const token = this.cookieService.getCookie('identity-token');
        try {
            const decodedToken = this.jwtService.decodeToken<IdentityTokenData>(token);

            if (!decodedToken) return;

            this.authenticatedUser$.next(decodedToken.user);
        } catch (error) {
            this.authenticatedUser$.next(null);
        }
    }
}
