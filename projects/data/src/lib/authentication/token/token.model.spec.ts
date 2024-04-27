import { SessionBuilder, TokenModelBuilder } from '@dnd-mapp/data';
import { defaultUser } from '@dnd-mapp/data/testing';

describe('TokenModel', () => {
    it('should set expiration time based on token type', () => {
        const accessToken = new TokenModelBuilder().withType('Access').isIssuedAt().build();
        const refreshToken = new TokenModelBuilder().withType('Refresh').isIssuedAt().build();

        const accessTokenLifespan = accessToken.expiresAt.getTime() - accessToken.issuedAt.getTime();
        const refreshTokenLifespan = refreshToken.expiresAt.getTime() - refreshToken.issuedAt.getTime();

        expect(accessTokenLifespan).toEqual(15 * 60 * 1_000); // Valid of 15 minutes
        expect(refreshTokenLifespan).toEqual(7 * 24 * 60 * 60 * 1_000); // Valid for 7 days
    });

    it('should not set expiration time if issued at is not set', () => {
        const token = new TokenModelBuilder().build();
        const date = new Date();

        expect(token.expiresAt).toBeNull();

        token.setExpiresAtBasedOnType();
        expect(token.expiresAt).toBeNull();

        token.issuedAt = date;
        token.setExpiresAtBasedOnType();

        expect(token.expiresAt).toEqual(new Date(date.getTime() + 15 * 60 * 1_000));
    });

    it('should return a JWT token payload', () => {
        const session = new SessionBuilder().withId().build();
        const date = new Date();

        const token = new TokenModelBuilder()
            .withId()
            .isIssuedAt(date)
            .notBefore(date)
            .assignToUser(defaultUser.id)
            .forSession(session.id)
            .build();
        const tokenJWTPayload = token.getJwtPayload();

        expect(tokenJWTPayload).toEqual({
            jti: token.jti,
            sub: defaultUser.id,
            ses: session.id,
            iat: Math.floor(date.getTime() / 1_000),
            nbf: Math.floor(date.getTime() / 1_000),
            exp: Math.floor((date.getTime() + 15 * 60 * 1_000) / 1_000),
        });
    });
});
