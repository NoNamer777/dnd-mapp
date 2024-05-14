import { SessionTokens, TokenModel, TokenModelBuilder, TokenTypes } from '@dnd-mapp/data';
import { ForbiddenException, Inject, Injectable, ValueProvider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService, backEndServerAddress } from '../../../common';
import { BackEndSession } from '../../entities';
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
        return (await this.tokenRepository.findOneByJti(jti)) ?? null;
    }

    async generateTokensForUser(userId: string, session: BackEndSession) {
        // TODO: Check whether the Authorization code has been validated
        if (!session.authorizationCode) {
            throw new ForbiddenException(`You're not allowed to generate tokens. Login required`);
        }
        await this.revokeTokensForUserSession(userId, session.id);

        const now = new Date();

        const accessToken = new TokenModelBuilder()
            .notBefore(now)
            .assignToUser(userId)
            .forSession(session.id)
            .withId()
            .withType(TokenTypes.ACCESS)
            .isIssuedAt(now)
            .build();

        const refreshToken = new TokenModelBuilder()
            .notBefore(now)
            .assignToUser(userId)
            .forSession(session.id)
            .withId()
            .withType(TokenTypes.REFRESH)
            .isIssuedAt(now)
            .build();

        await this.tokenRepository.create(accessToken);
        await this.tokenRepository.create(refreshToken);

        await this.cleanUpUserTokens(userId);
    }

    async getEncodedTokensForUserSession(userId: string, sessionId: string) {
        this.loggerService.log(`Retrieving JWT encoded tokens for User ${userId} for Session ${sessionId}`);
        const tokens = await this.tokenRepository.findActiveTokensForUserOnSession(userId, sessionId);
        const signedTokens = new SessionTokens();

        for (const token of tokens) {
            signedTokens[token.type.toLowerCase()] = await this.encodeToken(token);
        }
        return signedTokens;
    }

    async encodeToken(token: TokenModel) {
        return await this.jwtService.signAsync(
            { ...TokenModel.getJwtPayload(token) },
            {
                audience: [backEndServerAddress],
                issuer: backEndServerAddress,
            }
        );
    }

    async revokeTokensForUserSession(userId: string, sessionId: string) {
        this.loggerService.log(`Revoking JWT tokens for User ${userId} on Session ${sessionId}`);
        const userTokens = await this.tokenRepository.findActiveTokensForUserOnSession(userId, sessionId);

        for (const token of userTokens) {
            token.revoked = true;

            await this.tokenRepository.update(token);
        }
    }

    private async cleanUpUserTokens(userId: string) {
        this.loggerService.log(`Removing excess JWT tokens for User ${userId}`);
        const userTokens = await this.tokenRepository.findAllTokensForUser(userId);

        if (userTokens.length < this.maxTokens) return;

        while (userTokens.length > this.maxTokens) {
            const token = userTokens.shift();

            await this.tokenRepository.remove(token.jti);
        }
    }
}
