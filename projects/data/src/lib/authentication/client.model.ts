import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { nanoid } from 'nanoid';

// Authorization codes are valid for 30 seconds,
// which should be plenty of time for retrieving the JWT tokens.
const MAX_LIFESPAN_AUTHORIZATION_CODE = 30 * 1000;

export class ClientModel {
    static from(data: ClientModel) {
        if (!data) return null;

        return new ClientModel(data.id, data.codeChallenge, data.authorizationCode, data.codeGeneratedAt);
    }

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

    constructor(
        id?: string,
        codeChallenge?: string | null,
        authorizationCode?: string | null,
        codeGeneratedAt?: Date | null
    ) {
        this.id = id ? id : nanoid(32);

        this.codeChallenge = codeChallenge ?? null;
        this.authorizationCode = authorizationCode ?? null;
        this.codeGeneratedAt = codeGeneratedAt ?? null;
    }

    reset() {
        this.codeChallenge = null;
        this.authorizationCode = null;
        this.codeGeneratedAt = null;
    }

    authorizationCodeUsedWithinTime() {
        const now = new Date();

        return now.getTime() - this.codeGeneratedAt!.getTime() < MAX_LIFESPAN_AUTHORIZATION_CODE;
    }
}
