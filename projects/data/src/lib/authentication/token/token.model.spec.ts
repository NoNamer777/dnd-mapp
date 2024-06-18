import { TokenModelBuilder } from '@dnd-mapp/data';
import { defaultSession, defaultUser } from '@dnd-mapp/data/testing';
import { decode } from 'jsonwebtoken';

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

    it('should encode the JWT token', () => {
        const now = new Date();
        const token = new TokenModelBuilder()
            .withId()
            .withType('Access')
            .assignToUser(defaultUser.id)
            .forSession(defaultSession.id)
            .notBefore(now)
            .isIssuedAt(now)
            .build();

        const secret = 'my-very-strong-and-capable-secret';

        const encoded = token.encode({
            issuer: 'https://localhost.dndmapp.net',
            audience: ['https://localhost.dndmapp.net'],
            secret: secret,
        });

        expect(encoded).toEqual(expect.any(String));

        const decoded = decode(encoded, { json: true });

        expect(decoded).toEqual(
            expect.objectContaining({
                jti: expect.any(String),
                sub: defaultUser.id,
                ses: defaultSession.id,
                iss: 'https://localhost.dndmapp.net',
                aud: ['https://localhost.dndmapp.net'],
                nbf: Math.floor(new Date(now.getTime()).getTime() / 1_000),
                iat: Math.floor(new Date(now.getTime()).getTime() / 1_000),
                exp: Math.floor(new Date(now.getTime() + 15 * 60 * 1_000).getTime() / 1_000),
            })
        );

        console.log();
    });
});
