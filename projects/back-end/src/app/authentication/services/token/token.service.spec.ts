import { mockLoggingServiceProvider, mockTokenModuleProviders } from '@dnd-mapp/back-end/testing';
import { SessionBuilder, TokenModelBuilder } from '@dnd-mapp/data';
import { defaultUser, mockSessionDB, mockTokenDB } from '@dnd-mapp/data/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { createId } from '@paralleldrive/cuid2';
import { buildServerUrl } from '../../../common';
import { DndMappJwtModule, NestConfigModule, ServerConfig } from '../../../config';
import { TokenService, maxTokensProvider } from './token.service';

describe('TokenService', () => {
    async function setupTest(params?: { maxTokens?: number }) {
        const maxTokensTestProvider = params?.maxTokens
            ? {
                  provide: 'MAX_TOKENS',
                  useValue: params.maxTokens,
              }
            : maxTokensProvider;

        const module = await Test.createTestingModule({
            imports: [DndMappJwtModule, NestConfigModule],
            providers: [mockLoggingServiceProvider, ...mockTokenModuleProviders, maxTokensTestProvider],
        }).compile();

        const { host, port, address, useSsl } = module.get(ConfigService).get<ServerConfig>('server');
        buildServerUrl(host, port, useSsl, address);

        return {
            tokenService: module.get(TokenService),
            jwtService: module.get(JwtService),
        };
    }

    it('should retrieve a token', async () => {
        const id = createId();
        mockTokenDB.create(new TokenModelBuilder().withId(id).build());

        const { tokenService } = await setupTest();

        expect(await tokenService.getByJti(id)).toEqual(expect.objectContaining({ jti: id }));
    });

    it('should retrieve no token', async () => {
        const { tokenService } = await setupTest();
        expect(await tokenService.getByJti(createId())).toBeNull();
    });

    it('should generate tokens for a User', async () => {
        const session = mockSessionDB.create(new SessionBuilder().withAuthorizationCode().build());
        const { tokenService } = await setupTest();

        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);

        await tokenService.generateTokensForUser(defaultUser.id, session);
        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(2);
    });

    it('should not generate tokens for a User when Session has no Authorization code', async () => {
        const session = mockSessionDB.create(new SessionBuilder().build());
        const { tokenService } = await setupTest();

        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);

        await expect(tokenService.generateTokensForUser(defaultUser.id, session)).rejects.toThrow(
            `You're not allowed to generate tokens. Login required`
        );
        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(0);
    });

    it(`should revoke active tokens for a User's Session when generating new tokens`, async () => {
        const session = mockSessionDB.create(new SessionBuilder().withAuthorizationCode().build());
        const { tokenService } = await setupTest();

        await tokenService.generateTokensForUser(defaultUser.id, session);
        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(2);
        expect(mockTokenDB.findActiveTokensForUserOnSession(defaultUser.id, session.id)).toHaveLength(2);

        await tokenService.generateTokensForUser(defaultUser.id, session);
        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(4);
        expect(mockTokenDB.findActiveTokensForUserOnSession(defaultUser.id, session.id)).toHaveLength(2);
    });

    it('should remove excess tokens when number of existing User tokens exceeds max tokens limit', async () => {
        const session = mockSessionDB.create(new SessionBuilder().withAuthorizationCode().build());
        const { tokenService } = await setupTest({ maxTokens: 4 });

        // Generate 8 tokens at least
        await tokenService.generateTokensForUser(defaultUser.id, session);
        await tokenService.generateTokensForUser(defaultUser.id, session);
        await tokenService.generateTokensForUser(defaultUser.id, session);
        await tokenService.generateTokensForUser(defaultUser.id, session);

        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(4);
    });

    it(`should retrieve tokens for a User's Session JWT encoded`, async () => {
        const session = mockSessionDB.create(new SessionBuilder().withAuthorizationCode().build());
        const { tokenService } = await setupTest();

        await tokenService.generateTokensForUser(defaultUser.id, session);

        const tokens = await tokenService.getEncodedTokensForUserSession(defaultUser.id, session.id);

        Object.entries(tokens).forEach(([_, encodedToken]) => expect(encodedToken).toEqual(expect.any(String)));
    });
});
