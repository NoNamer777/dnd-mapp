import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { nanoid } from 'nanoid';

// Authorization codes are valid for 30 seconds,
// which should be plenty of time for retrieving the JWT tokens.
const MAX_LIFESPAN_AUTHORIZATION_CODE = 30 * 1000;

export class ClientModel {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    codeChallenge: string = null;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    authorizationCode: string = null;

    @IsOptional()
    @IsDate()
    codeGeneratedAt: Date = null;

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

export class ClientBuilder {
    private readonly client = new ClientModel();

    build() {
        return this.client;
    }

    codeGeneratedAt(timestamp: Date) {
        this.client.codeGeneratedAt = timestamp;

        return this;
    }

    withAuthorizationCode(code: string) {
        this.client.authorizationCode = code;
        this.client.codeGeneratedAt = new Date();

        return this;
    }

    withCodeChallenge(challenge: string) {
        this.client.codeChallenge = challenge;

        return this;
    }

    withId(id?: string) {
        this.client.id = id ? id : nanoid(32);

        return this;
    }
}
