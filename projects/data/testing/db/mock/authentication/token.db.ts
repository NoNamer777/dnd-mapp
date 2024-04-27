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

    findActiveTokensForUserOnSession(userId: string, sessionId: string) {
        return Object.values(this.db).filter(
            (token) => token.subject === userId && token.sessionId === sessionId && !token.revoked
        );
    }

    findAllTokensForUser(userId: string) {
        return Object.values(this.db).filter((token) => token.subject === userId);
    }

    findOneByJti(jti: string) {
        return Object.values(this.db).find((token) => token.jti === jti);
    }

    create(token: TokenModel) {
        this.db[token.jti] = token;
        return token;
    }

    update(token: TokenModel) {
        this.db[token.jti] = token;
        return token;
    }

    remove(jti: string) {
        delete this.db[jti];
    }
}

export const mockTokenDB = new MockTokenDB();
