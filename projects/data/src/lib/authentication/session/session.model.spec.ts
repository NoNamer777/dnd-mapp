import { SessionBuilder } from '@dnd-mapp/data';

describe('Session', () => {
    it('should generate an authorization code and set the generated date', () => {
        const session = new SessionBuilder().withId().build();

        expect(session.authCodeGeneratedAt).toBeNull();
        expect(session.authorizationCode).toBeNull();

        session.generateAuthorizationCode();

        expect(session.authCodeGeneratedAt).toEqual(expect.any(Date));
        expect(session.authorizationCode).toEqual(expect.any(String));
    });

    it('should return whether the authorization code is valid', () => {
        const session = new SessionBuilder().withAuthorizationCode().build();

        expect(session.validAuthorizationCode(session.authorizationCode)).toEqual(true);
    });

    it('should return no valid authorization code when used outside the timeframe', () => {
        const session = new SessionBuilder()
            .withAuthorizationCode()
            .codeGeneratedAt(new Date(Date.now() - 40_000))
            .build();

        expect(session.validAuthorizationCode(session.authorizationCode)).toEqual(false);
    });

    it('should reset session', () => {
        const session = new SessionBuilder().withAuthorizationCode().withCodeChallenge('challenge').build();

        expect(session.authorizationCode).toBeDefined();
        expect(session.codeChallenge).toBeDefined();
        expect(session.authCodeGeneratedAt).toBeDefined();

        session.reset();

        expect(session.authorizationCode).toBeNull();
        expect(session.codeChallenge).toBeNull();
        expect(session.authCodeGeneratedAt).toBeNull();
    });
});
