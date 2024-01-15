import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

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

export class RegisterQueryParamsDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    state: string;
}
