import { TokenModel } from '../../../../src';

interface TokenDB {
    [jti: string]: TokenModel;
}

class MockTokenDB {
    private db: TokenDB;

    constructor() {
        this.reset();
    }

    reset() {
        this.db = {};
    }

    findAllTokensForUser(userId: string) {
        return Object.values(this.db).filter((token) => token.subject === userId);
    }

    findActiveTokensForUserSession(userId: string, sessionId: string) {
        return Object.values(this.db).filter(
            (token) => token.subject === userId && token.sessionId === sessionId && !token.revoked
        );
    }

    findOneByJti(jti: string) {
        return Object.values(this.db).find((token) => token.jti === jti);
    }

    create(token: TokenModel) {
        this.db[token.jti] = token;

        return token;
    }

    remove(token: TokenModel) {
        delete this.db[token.jti];
    }
}

export const mockTokenDB = new MockTokenDB();
