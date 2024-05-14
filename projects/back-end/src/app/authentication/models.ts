import { Session } from '@dnd-mapp/data';
import { IsBase64, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

const tokenGrantType = {
    AUTHORIZATION: 'authorizationCode',
    REFRESH_TOKEN: 'refreshToken',
} as const;

type TokenGrantType = (typeof tokenGrantType)[keyof typeof tokenGrantType];

export class TokenQueryParams {
    @IsString()
    @IsNotEmpty()
    @IsEnum(tokenGrantType)
    grantType: TokenGrantType;
}

export class LoginRequest {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SignUpRequest {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;
}

export class StateRequest {
    @IsString()
    @IsNotEmpty()
    state: string;
}

export class StateResponse {
    state: string;
}

export class CodeChallengeRequest extends StateRequest {
    @IsString()
    @IsNotEmpty()
    @IsBase64()
    codeChallenge: string;
}

export class SessionResponse extends StateResponse {
    data: Session;

    constructor(state: string, session: Session) {
        super();
        this.state = state;
        this.data = session;
    }
}

export class AuthorizationCodeResponse extends StateResponse {
    data: {
        authorizationCode: string;
    };
}

export class TokenRequest {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    codeVerifier?: string;

    @IsString()
    @IsNotEmpty()
    @IsBase64()
    @IsOptional()
    authorizationCode?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username?: string;
}
