import { Session, SessionBuilder } from '@dnd-mapp/data';
import { Exclude } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { randomBytes } from 'crypto';

// Authorization codes are valid for 30 seconds,
// which should be plenty of time for retrieving the JWT tokens.
const MAX_LIFESPAN_AUTHORIZATION_CODE = 30 * 1000;

export class BackEndSession extends Session {
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

    reset() {
        this.codeChallenge = null;
        this.authorizationCode = null;
        this.authCodeGeneratedAt = null;
    }

    generateAuthorizationCode() {
        this.authorizationCode = randomBytes(64).toString('base64');
        this.authCodeGeneratedAt = new Date();
    }

    validAuthorizationCode(authorizationCode: string) {
        return this.authorizationCodeUsedWithinTime() && authorizationCode === this.authorizationCode;
    }

    private authorizationCodeUsedWithinTime() {
        const now = new Date();
        return now.getTime() - this.authCodeGeneratedAt.getTime() < MAX_LIFESPAN_AUTHORIZATION_CODE;
    }
}

export class BackEndSessionBuilder extends SessionBuilder {
    protected readonly session: BackEndSession = new BackEndSession();

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
}
