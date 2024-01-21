import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { nanoid } from 'nanoid';

export class ClientModel {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    codeChallenge: string | null;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    authorizationCode: string | null;

    @IsOptional()
    @IsDate()
    codeGeneratedAt: Date | null;

    constructor() {
        this.id = nanoid(32);
    }
}
