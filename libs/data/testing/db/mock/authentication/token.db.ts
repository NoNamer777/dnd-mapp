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

    findAllTokensForUser(userId: number) {
        return Object.values(this.db).filter((token) => token.user.id === userId);
    }

    findActiveTokensForUserOnClient(userId: number, clientId: string) {
        return Object.values(this.db).filter(
            (token) => token.user.id === userId && token.client.id === clientId && !token.revoked
        );
    }

    findOneByJti(jti: string) {
        return Object.values(this.db).find((token) => token.jti === jti);
    }

    save(token: TokenModel) {
        this.db[token.jti] = token;

        return token;
    }

    remove(token: TokenModel) {
        delete this.db[token.jti];
    }
}

export const mockTokenDB = new MockTokenDB();
