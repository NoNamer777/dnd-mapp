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
    jti: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    sessionId: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(TokenTypes)
    type: TokenType;

    @IsBoolean()
    revoked: boolean;

    @IsDate()
    notBefore: Date;

    @IsDate()
    issuedAt: Date;

    @IsDate()
    expiresAt: Date;

    setExpiresAtBasedOnType() {
        if (!this.type || !this.issuedAt) return;

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

    isIssuedAt(when: Date) {
        this.token.issuedAt = when;

        this.token.setExpiresAtBasedOnType();
        return this;
    }

    notBefore(when: Date) {
        this.token.notBefore = when;
        return this;
    }

    withId() {
        this.token.jti = createId();
        return this;
    }

    withType(type: TokenType) {
        this.token.type = type;
        return this;
    }
}
