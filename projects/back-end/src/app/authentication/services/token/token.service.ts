import { SessionModel, TokenModelBuilder, TokenType, TokenTypes, UserModel } from '@dnd-mapp/data';
import { Inject, Injectable, ValueProvider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService, backEndServerAddress } from '../../../common';
import { TokenRepository } from '../../repositories';

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

    async getByJti(jti: string) {
        return await this.tokenRepository.findOneByJti(jti);
    }

    async generateTokensForUser(user: UserModel, session: SessionModel) {
        await this.revokeTokensForUserSession(user.id, session.id);

        const now = new Date();

        const accessToken = new TokenModelBuilder()
            .notBefore(now)
            .assignToUser(user)
            .forSession(session)
            .withId()
            .withType(TokenTypes.ACCESS)
            .isIssuedAt(now)
            .build();

        const refreshToken = new TokenModelBuilder()
            .notBefore(now)
            .assignToUser(user)
            .forSession(session)
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

        await this.tokenRepository.save(identityToken);
        await this.tokenRepository.create(accessToken);
        await this.tokenRepository.create(refreshToken);

        await this.cleanUpUserTokens(user);
    }

    async getEncodedTokensForUserSession(userId: string, sessionId: string) {
        this.loggerService.log(`Retrieving JWT encoded tokens for User ${userId} for Session ${sessionId}`);
        const tokens = await this.tokenRepository.findActiveTokensForUserOnSession(userId, sessionId);
        const signedTokens = {} as Record<TokenType, string>;

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

    async revokeTokensForUserSession(userId: string, sessionId: string) {
        this.loggerService.log(`Revoking JWT tokens for User ${userId} on Session ${sessionId}`);
        const userTokens = await this.tokenRepository.findActiveTokensForUserOnSession(userId, sessionId);

        for (const token of userTokens) {
            token.revoked = true;

            await this.tokenRepository.update(token);
        }
    }

    private async cleanUpUserTokens(user: UserModel) {
        this.loggerService.log(`Removing excess JWT tokens for User ${user.id}`);
        const userTokens = await this.tokenRepository.findAllTokensForUser(user.id);

        if (userTokens.length < this.maxTokens) return;

        while (userTokens.length > this.maxTokens) {
            const token = userTokens.shift();

            await this.tokenRepository.remove(token.jti);
        }
    }
}
