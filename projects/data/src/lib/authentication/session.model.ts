import { createId } from '@paralleldrive/cuid2';
import { Exclude } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { randomBytes } from 'crypto';
import { TokenModel } from './token.model';

// Authorization codes are valid for 30 seconds,
// which should be plenty of time for retrieving the JWT tokens.
const MAX_LIFESPAN_AUTHORIZATION_CODE = 30 * 1000;

export class SessionTokens {
    access?: string | TokenModel;
    refresh?: string | TokenModel;
}

export class SessionModel {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Exclude({ toPlainOnly: true })
    codeChallenge: string = null;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Exclude({ toPlainOnly: true })
    authorizationCode: string = null;

    @IsOptional()
    @IsDate()
    @Exclude({ toPlainOnly: true })
    authCodeGeneratedAt: Date = null;

    tokens: SessionTokens = null;

    reset() {
        this.codeChallenge = null;
        this.authorizationCode = null;
        this.authCodeGeneratedAt = null;
    }

    generateAuthorizationCode() {
        this.authorizationCode = randomBytes(64).toString('base64');
        this.authCodeGeneratedAt = new Date();
    }

    authorizationCodeUsedWithinTime() {
        const now = new Date();

        return now.getTime() - this.authCodeGeneratedAt!.getTime() < MAX_LIFESPAN_AUTHORIZATION_CODE;
    }
}

export class SessionBuilder {
    private readonly session = new SessionModel();

    build() {
        return this.session;
    }

    codeGeneratedAt(timestamp: Date) {
        this.session.authCodeGeneratedAt = timestamp;

        return this;
    }

    withAuthorizationCode() {
        this.session.generateAuthorizationCode();

        return this;
    }

    withCodeChallenge(challenge: string) {
        this.session.codeChallenge = challenge;

        return this;
    }

    withTokens(tokens: SessionTokens) {
        this.session.tokens = {
            access: tokens.access,
            refresh: tokens.refresh,
        };
        return this;
    }

    withId(id?: string) {
        this.session.id = id ? id : createId();

        return this;
    }
}
