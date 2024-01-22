import { ClientModel } from '@dnd-mapp/data';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { randomBytes } from 'crypto';
import { LoggerService } from '../../../common';
import { ClientRepository } from '../../repositories';

@Injectable()
export class ClientService {
    constructor(
        private readonly logger: LoggerService,
        private readonly clientRepository: ClientRepository
    ) {
        this.logger.setContext(ClientService.name);
    }

    async create() {
        this.logger.log('Creating a new Client configuration');

        return await this.clientRepository.save(new ClientModel());
    }

    async findById(id: string, throwsError = true) {
        this.logger.log(`Finding Client configuration with ID: '${id}'`);
        const byId = await this.clientRepository.findOneById(id);

        if (!byId && throwsError) {
            throw new NotFoundException(`Couldn't find Client with ID: '${id}'`);
        }
        return ClientModel.from(byId);
    }

    async verifyCodeChallengeForClient(client: ClientModel, codeVerifier: string) {
        this.logger.log(`Validating code challenge for Client with ID: '${client.id}'`);

        const challengeFromVerifier = crypto.createHash('sha256').update(codeVerifier).digest().toString('base64');

        if (challengeFromVerifier !== client.codeChallenge) {
            this.logger.warn(`Code challenge validation failed for Client with ID: '${client.id}'`);
            await this.resetClientAuthorization(client);
            throw new ForbiddenException();
        }
    }

    async verifyAuthorizationCode(client: ClientModel, authorizationCode: string) {
        this.logger.log(`Validating authorization code for Client with ID: '${client.id}'`);

        if (client.authorizationCode !== authorizationCode || !client.authorizationCodeUsedWithinTime()) {
            this.logger.warn(`Authorization code validation failed for Client with ID: '${client.id}'`);
            await this.resetClientAuthorization(client);
            throw new ForbiddenException();
        }
    }

    async resetClientAuthorization(client: ClientModel) {
        client.reset();
        await this.update(client);
    }

    async update(client: ClientModel) {
        this.logger.log(`Updating Client configuration with ID: '${client.id}'`);
        const byId = await this.findById(client.id, false);

        if (!byId) {
            throw new NotFoundException(`Could not update client with ID: '${client.id}' because it does not exist`);
        }
        return ClientModel.from(await this.clientRepository.save(client));
    }

    async generateAuthorizationCodeForClient(id: string) {
        this.logger.log(`Generating authorization code for Client with ID: '${id}'`);
        const byId = await this.findById(id, false);

        if (!byId) {
            throw new NotFoundException(
                `Could not generate authorization code for Client with ID: '${id}' because it does not exist`
            );
        }
        const authorizationCode = randomBytes(64).toString('base64');

        byId.authorizationCode = authorizationCode;
        byId.codeGeneratedAt = new Date();

        await this.update(byId);

        return authorizationCode;
    }

    async remove(id: string) {
        this.logger.log(`Removing Client configuration with ID: '${id}'`);

        if (!(await this.findById(id, false))) {
            throw new NotFoundException(`Couldn't remove Client by ID: '${id}' because it does not exist`);
        }
        await this.clientRepository.deleteById(id);
    }
}
