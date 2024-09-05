import { defaultClient, defaultUser, mockTokenDB } from '@dnd-mapp/data/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { mockLoggingServiceProvider } from '../../../../../testing';
import { mockTokenModuleProviders } from '../../../../../testing/mock/entities/authentication/mock-token-module.provider';
import { buildServerUrl } from '../../../common';
import { DndMappJwtModule, NestConfigModule, ServerConfig } from '../../../config';
import { TokenService } from './token.service';

describe('TokenService', () => {
    async function setupEnvironment() {
        const module = await Test.createTestingModule({
            imports: [DndMappJwtModule, NestConfigModule],
            providers: [mockLoggingServiceProvider, ...mockTokenModuleProviders],
        }).compile();

        const { host, port, address, useSsl } = module.get(ConfigService).get<ServerConfig>('server');

        buildServerUrl(host, port, useSsl, address);

        return {
            tokenService: module.get(TokenService),
            jwtService: module.get(JwtService),
        };
    }

    it('should generate tokens for a User on a particular Client', async () => {
        const { tokenService } = await setupEnvironment();

        await expect(tokenService.generateTokensForUser(defaultUser, defaultClient)).resolves.not.toThrow();

        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(3);
    });

    it('should clean up tokens for a User after max tokens have been reached', async () => {
        const { tokenService } = await setupEnvironment();

        await tokenService.generateTokensForUser(defaultUser, defaultClient);
        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(3);

        await tokenService.generateTokensForUser(defaultUser, defaultClient);
        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(6);

        await tokenService.generateTokensForUser(defaultUser, defaultClient);
        expect(mockTokenDB.findAllTokensForUser(defaultUser.id)).toHaveLength(6);
    });

    it('should revoke active tokens when generating new tokens for a User on a Client', async () => {
        const { tokenService } = await setupEnvironment();

        await tokenService.generateTokensForUser(defaultUser, defaultClient);

        const previouslyActiveTokens = mockTokenDB.findActiveTokensForUserOnClient(defaultUser.id, defaultClient.id);

        await tokenService.generateTokensForUser(defaultUser, defaultClient);

        const currentlyActiveTokens = mockTokenDB.findActiveTokensForUserOnClient(defaultUser.id, defaultClient.id);

        expect(currentlyActiveTokens).not.toContain(expect.arrayContaining(previouslyActiveTokens));
    });

    it('should return encoded token data', async () => {
        const { tokenService, jwtService } = await setupEnvironment();

        await tokenService.generateTokensForUser(defaultUser, defaultClient);

        const tokenData = await tokenService.getEncodedTokensUserOnForClient(defaultUser, defaultClient);
        const tokens = mockTokenDB.findActiveTokensForUserOnClient(defaultUser.id, defaultClient.id);

        for (const data of tokenData) {
            const token = tokens.find((token) => token.type === data[0]);
            const decodedToken = jwtService.decode(data[1].token);

            expect(token.jti).toEqual(decodedToken.jti);
            expect(token.user.id).toEqual(decodedToken.sub);
            expect(token.client.id).toEqual(decodedToken.clt);
            expect(Math.floor(token.issuedAt.getTime() / 1_000)).toEqual(decodedToken.iat);
            expect(Math.floor(token.notBefore.getTime() / 1_000)).toEqual(decodedToken.nbf);
            expect(Math.floor(token.expiresAt.getTime() / 1_000)).toEqual(decodedToken.exp);
        }
    });
});
