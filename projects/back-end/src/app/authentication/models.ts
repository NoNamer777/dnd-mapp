import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SignUpDto {
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
