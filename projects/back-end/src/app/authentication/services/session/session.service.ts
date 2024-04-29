import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { LoggerService } from '../../../common';
import { BackEndSession, BackEndSessionBuilder } from '../../entities';
import { SessionRepository } from '../../repositories';

@Injectable()
export class SessionService {
    constructor(
        private readonly logger: LoggerService,
        private readonly sessionRepository: SessionRepository
    ) {
        this.logger.setContext(SessionService.name);
    }

    async initialize() {
        this.logger.log('Creating a new Session');

        return await this.sessionRepository.create(new BackEndSessionBuilder().withId().build());
    }

    async findById(sessionId: string) {
        this.logger.log(`Finding Session: '${sessionId}'`);
        const byId = await this.sessionRepository.findOneById(sessionId);

        if (!byId) {
            throw new NotFoundException(`Couldn't find Session: '${sessionId}'`);
        }
        return byId;
    }

    async verifyCodeChallenge(session: BackEndSession, codeVerifier: string) {
        this.logger.log(`Validating code challenge for Session: '${session.id}'`);

        const challengeFromVerifier = crypto.createHash('sha256').update(codeVerifier).digest().toString('base64');

        if (challengeFromVerifier !== session.codeChallenge) {
            this.logger.warn(`Code challenge validation failed for Session: '${session.id}'`);
            await this.resetAuthorization(session);
            throw new BadRequestException();
        }
    }

    async verifyAuthorizationCode(session: BackEndSession, authorizationCode: string) {
        this.logger.log(`Validating authorization code for Session: '${session.id}'`);

        if (!session.validAuthorizationCode(authorizationCode)) {
            this.logger.warn(`Authorization code validation failed for Session: '${session.id}'`);
            await this.resetAuthorization(session);
            throw new BadRequestException();
        }
    }

    async resetAuthorization(session: BackEndSession) {
        session.reset();
        await this.update(session);
    }

    async update(session: BackEndSession) {
        this.logger.log(`Updating Session ${session.id}`);
        return await this.sessionRepository.update(session);
    }

    async generateAuthorizationCode(session: BackEndSession) {
        this.logger.log(`Generating authorization code for Session: '${session.id}'`);
        session.generateAuthorizationCode();

        await this.update(session);

        return session.authorizationCode;
    }

    async end(id: string) {
        this.logger.log(`Ending session: '${id}'`);
        await this.sessionRepository.remove(id);
    }
}
