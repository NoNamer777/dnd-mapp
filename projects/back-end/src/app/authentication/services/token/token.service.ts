import { ClientModel, TokenModelBuilder, TokenTypes, UserModel } from '@dnd-mapp/data';
import { Inject, Injectable, ValueProvider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService, backEndServerAddress } from '../../../common';
import { TokenRepository } from '../../repositories/token.repository';

const MAX_TOKENS_PER_USER = 201;

export const maxTokensProvider: ValueProvider = {
    provide: 'MAX_TOKENS',
    useValue: MAX_TOKENS_PER_USER,
};

@Injectable()
export class TokenService {
    constructor(
        private readonly loggerService: LoggerService,
        private readonly jwtService: JwtService,
        private readonly tokenRepository: TokenRepository,
        @Inject('MAX_TOKENS') private readonly maxTokens: number
    ) {
        this.loggerService.setContext(TokenService.name);
    }

    async generateTokensForUser(user: UserModel, client: ClientModel) {
        await this.revokedTokensForUserOnClient(user, client);

        const now = new Date();

        const accessToken = new TokenModelBuilder()
            .notBefore(now)
            .assignToUser(user)
            .forClient(client)
            .withId()
            .withType(TokenTypes.ACCESS)
            .isIssuedAt(now)
            .build();

        const refreshToken = new TokenModelBuilder()
            .notBefore(now)
            .assignToUser(user)
            .forClient(client)
            .withId()
            .withType(TokenTypes.REFRESH)
            .isIssuedAt(now)
            .build();

        const identityToken = new TokenModelBuilder()
            .notBefore(now)
            .assignToUser(user)
            .forClient(client)
            .withId()
            .withType(TokenTypes.IDENTITY)
            .isIssuedAt(now)
            .build();

        await this.tokenRepository.save(accessToken);
        await this.tokenRepository.save(refreshToken);
        await this.tokenRepository.save(identityToken);

        await this.cleanUpUserTokensForClient(user);
    }

    async getEncodedTokensUserOnForClient(user: UserModel, client: ClientModel) {
        const tokens = await this.tokenRepository.findActiveTokensForUserOnClient(user.id, client.id);
        const signedTokens: Map<TokenTypes, { token: string; expiresAt: Date }> = new Map();

        for (const token of tokens) {
            signedTokens.set(token.type, {
                expiresAt: token.expiresAt,
                token: await this.jwtService.signAsync(
                    { ...token.getJwtPayload() },
                    {
                        audience: [backEndServerAddress],
                        issuer: backEndServerAddress,
                    }
                ),
            });
        }
        return signedTokens;
    }

    private async cleanUpUserTokensForClient(user: UserModel) {
        const userTokens = await this.tokenRepository.findAllTokensForUser(user.id);

        if (userTokens.length < this.maxTokens) return;

        while (userTokens.length > this.maxTokens) {
            const token = userTokens.shift();

            await this.tokenRepository.remove(token);
        }
    }

    private async revokedTokensForUserOnClient(user: UserModel, client: ClientModel) {
        const userTokens = await this.tokenRepository.findActiveTokensForUserOnClient(user.id, client.id);

        for (const token of userTokens) {
            token.revoked = true;

            await this.tokenRepository.save(token);
        }
    }
}
