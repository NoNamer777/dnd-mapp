import { SessionBuilder, SessionModel, TokenModel, TokenTypes } from '@dnd-mapp/data';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { randomBytes } from 'crypto';
import { LoggerService } from '../../../common';
import { SessionRepository } from '../../repositories';
import { TokenService } from '../token';

@Injectable()
export class SessionService {
    constructor(
        private readonly logger: LoggerService,
        private readonly tokenService: TokenService,
        private readonly sessionRepository: SessionRepository
    ) {
        this.logger.setContext(SessionService.name);
    }

    async initialize() {
        this.logger.log('Creating a new Session');

        return await this.sessionRepository.create(new SessionBuilder().withId().build());
    }

    async findById(sessionId: string) {
        this.logger.log(`Finding Session: '${sessionId}'`);
        const byId = await this.sessionRepository.findOneById(sessionId);

        if (!byId) {
            throw new NotFoundException(`Couldn't find Session: '${sessionId}'`);
        }
        const sessionBuilder = new SessionBuilder()
            .withId(byId.id)
            .withAuthorizationCode(byId.authorizationCode)
            .codeGeneratedAt(byId.authCodeGeneratedAt)
            .withCodeChallenge(byId.codeChallenge);

        if (byId.tokens.access) {
            const tokens = await this.tokenService.getEncodedTokensForUserSession(
                (byId.tokens.access as TokenModel).subject,
                sessionId
            );

            sessionBuilder.withTokens({
                access: tokens[TokenTypes.ACCESS],
                refresh: tokens[TokenTypes.REFRESH],
            });
        }
        return sessionBuilder.build();
    }

    async verifyCodeChallenge(session: SessionModel, codeVerifier: string) {
        this.logger.log(`Validating code challenge for Session: '${session.id}'`);

        const challengeFromVerifier = crypto.createHash('sha256').update(codeVerifier).digest().toString('base64');

        if (challengeFromVerifier !== session.codeChallenge) {
            this.logger.warn(`Code challenge validation failed for Session: '${session.id}'`);
            await this.resetAuthorization(session);
            throw new ForbiddenException();
        }
    }

    async verifyAuthorizationCode(session: SessionModel, authorizationCode: string) {
        this.logger.log(`Validating authorization code for Session: '${session.id}'`);

        if (session.authorizationCode !== authorizationCode || !session.authorizationCodeUsedWithinTime()) {
            this.logger.warn(`Authorization code validation failed for Session: '${session.id}'`);
            await this.resetAuthorization(session);
            throw new ForbiddenException();
        }
    }

    async resetAuthorization(session: SessionModel) {
        session.reset();
        await this.update(session);
    }

    async update(session: SessionModel) {
        this.logger.log(`Updating Session ${session.id}`);
        return await this.sessionRepository.update(session);
    }

    async generateAuthorizationCode(session: SessionModel) {
        this.logger.log(`Generating authorization code for Session: '${session.id}'`);
        const authorizationCode = randomBytes(64).toString('base64');

        session.authorizationCode = authorizationCode;
        session.authCodeGeneratedAt = new Date();

        await this.update(session);

        return authorizationCode;
    }

    async end(id: string) {
        this.logger.log(`Ending session: '${id}'`);
        await this.sessionRepository.remove(id);
    }
}
