import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { nanoid } from 'nanoid';
import { ClientModel } from './client.model';
import { UserModel } from './user.model';

export enum TokenTypes {
    ACCESS = 'Access',
    REFRESH = 'Refresh',
    IDENTITY = 'Identity',
}

const TOKEN_EXPIRATION_TIME_PER_TYPE: Record<TokenTypes, number> = {
    [TokenTypes.ACCESS]: 15 * 60 * 1_000, // Valid for 15 minutes
    [TokenTypes.REFRESH]: 7 * 24 * 60 * 60 * 1_000, // Valid for 7 days
    [TokenTypes.IDENTITY]: 10 * 60 * 60 * 1_000, // Valid for 10 hours
};

export type TokenType = (typeof TokenTypes)[keyof typeof TokenTypes];

export class TokenModel {
    static from(data: TokenModel) {
        return new TokenModel(
            data.jti,
            data.type,
            data.revoked,
            data.notBefore,
            data.issuedAt,
            data.expiresAt,
            data.client,
            data.user
        );
    }

    @IsString()
    @IsNotEmpty()
    jti: string;

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

    @ValidateNested()
    client: ClientModel;

    @ValidateNested()
    user: UserModel;

    constructor(
        jti?: string,
        type?: TokenType,
        revoked?: boolean,
        notBefore?: Date,
        issuedAt?: Date,
        expiresAt?: Date,
        client?: ClientModel,
        user?: UserModel
    ) {
        if (jti) this.jti = jti;
        if (type) this.type = type;
        if (revoked) this.revoked = revoked;
        if (notBefore) this.notBefore = notBefore;
        if (issuedAt) this.issuedAt = issuedAt;
        if (expiresAt) this.expiresAt = expiresAt;
        if (client) this.client = client;
        if (user) this.user = user;
    }

    setExpiresAtBasedOnType() {
        if (!this.type || !this.issuedAt) return;

        this.expiresAt = new Date(this.issuedAt.getTime() + TOKEN_EXPIRATION_TIME_PER_TYPE[this.type]);
    }

    getJwtPayload = () => ({
        jti: this.jti,
        sub: this.user.id,
        clt: this.client.id,
        nbf: Math.floor(this.notBefore.getTime() / 1_000),
        iat: Math.floor(this.issuedAt.getTime() / 1_000),
        exp: Math.floor(this.expiresAt.getTime() / 1_000),
        ...(this.type !== TokenTypes.IDENTITY
            ? {}
            : {
                  user: {
                      id: this.user.id,
                      username: this.user.username,
                      emailAddress: this.user.emailAddress,
                      roles: this.user.roles,
                  },
              }),
    });
}

export class TokenModelBuilder {
    private readonly token: TokenModel;

    constructor() {
        this.token = new TokenModel();
    }

    assignToUser(user: UserModel) {
        this.token.user = user;

        return this;
    }

    build() {
        return this.token;
    }

    forClient(client: ClientModel) {
        this.token.client = client;

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
        this.token.jti = nanoid(16);

        return this;
    }

    withType(type: TokenType) {
        this.token.type = type;

        return this;
    }
}
