import { IsBase64, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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

export class ClientIdResponse extends StateResponse {
    id: string;
}

export class CodeChallengeRequest extends StateRequest {
    @IsString()
    @IsNotEmpty()
    @IsBase64()
    codeChallenge: string;
}

export class AuthorizationCodeResponse extends StateResponse {
    authorizationCode: string;
}
