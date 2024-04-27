import { createId } from '@paralleldrive/cuid2';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export const TokenTypes = {
    ACCESS: 'Access',
    REFRESH: 'Refresh',
} as const;

export type TokenType = (typeof TokenTypes)[keyof typeof TokenTypes];

const TOKEN_EXPIRATION_TIME_PER_TYPE = {
    Access: 15 * 60 * 1_000, // Valid for 15 minutes
    Refresh: 7 * 24 * 60 * 60 * 1_000, // Valid for 7 days
} as const;

export class TokenData {
    jti: string;
    sub: string;
    ses: string;
    nbf: number;
    iat: number;
    exp: number;
    iss: string;
    aud: string[];
}

export class TokenModel {
    @IsString()
    @IsNotEmpty()
    jti: string = null;

    @IsString()
    @IsNotEmpty()
    subject: string = null;

    @IsString()
    @IsNotEmpty()
    sessionId: string = null;

    @IsString()
    @IsNotEmpty()
    @IsEnum(TokenTypes)
    type: TokenType = 'Access';

    @IsBoolean()
    revoked = false;

    @IsDate()
    notBefore: Date = null;

    @IsDate()
    issuedAt: Date = null;

    @IsDate()
    expiresAt: Date = null;

    setExpiresAtBasedOnType() {
        if (!this.issuedAt) return;
        this.expiresAt = new Date(this.issuedAt.getTime() + TOKEN_EXPIRATION_TIME_PER_TYPE[this.type]);
    }

    getJwtPayload = () => ({
        jti: this.jti,
        sub: this.subject,
        ses: this.sessionId,
        nbf: Math.floor(this.notBefore.getTime() / 1_000),
        iat: Math.floor(this.issuedAt.getTime() / 1_000),
        exp: Math.floor(this.expiresAt.getTime() / 1_000),
    });
}

export class TokenModelBuilder {
    private readonly token = new TokenModel();

    assignToUser(userId: string) {
        this.token.subject = userId;
        return this;
    }

    build() {
        return this.token;
    }

    forSession(sessionId: string) {
        this.token.sessionId = sessionId;
        return this;
    }

    isIssuedAt(when?: Date) {
        this.token.issuedAt = when ?? new Date();

        this.token.setExpiresAtBasedOnType();
        return this;
    }

    notBefore(when: Date) {
        this.token.notBefore = when;
        return this;
    }

    withId(id?: string) {
        this.token.jti = id ?? createId();
        return this;
    }

    withType(type: TokenType) {
        this.token.type = type;
        return this;
    }
}
