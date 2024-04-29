import { createId } from '@paralleldrive/cuid2';
import { IsNotEmpty, IsString } from 'class-validator';
import { TokenModel } from '../token/token.model';

export class SessionTokens {
    access?: string | TokenModel;
    refresh?: string | TokenModel;
}

export class Session {
    @IsString()
    @IsNotEmpty()
    id: string;

    tokens: SessionTokens = null;
}

export class SessionBuilder {
    protected readonly session = new Session();

    build() {
        return this.session;
    }

    withId(id?: string) {
        this.session.id = id ? id : createId();
        return this;
    }

    withTokens(tokens: SessionTokens) {
        this.session.tokens = {
            access: tokens.access,
            refresh: tokens.refresh,
        };
        return this;
    }
}
