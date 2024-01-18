import { Injectable } from '@angular/core';
import { CreateUserData, User, UserModel } from '@dnd-mapp/data';
import { nanoid } from 'nanoid';
import { BehaviorSubject, from, map, switchMap, take } from 'rxjs';
import { DmaHttpRequestService, TextCodingService } from '../../../shared';
import { ConfigService } from '../../services/config.service';

interface AuthorizeResponse {
    authorizationCode: string;
}

interface TokenRequestBody {
    codeVerifier: string;
    authorizationCode: string;
    clientId: string;
}

type SignUpResponse = Omit<UserModel, 'roles'>;

@Injectable({ providedIn: 'root' })
export class DmaAuthenticationService {
    authenticatedUser$ = new BehaviorSubject<User | null>(null);

    private codeVerifier: string | null = null;

    constructor(
        private readonly requestService: DmaHttpRequestService,
        private readonly textCodingService: TextCodingService,
        private readonly configService: ConfigService
    ) {
        this.initialize();
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
            switchMap((authorizationCode) => this.requestTokens(authorizationCode))
        );
    }

    signUp(userData: CreateUserData) {
        return this.requestService.post<SignUpResponse, CreateUserData>('/authentication/sign-up', userData);
    }

    private requestTokens(authorizationCode: string) {
        return this.configService.config$.pipe(
            take(1),
            switchMap(({ id }) =>
                this.requestService.post<void, TokenRequestBody>('/authentication/token', {
                    codeVerifier: this.codeVerifier!,
                    authorizationCode: authorizationCode,
                    clientId: id,
                })
            )
        );
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

    private initialize() {
        console.warn('INITIALIZING AUTHENTICATION');
    }
}
