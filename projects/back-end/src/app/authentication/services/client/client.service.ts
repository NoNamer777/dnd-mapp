import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { LoggerService } from '../../../common';
import { ClientEntity } from '../../entities';
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

        return await this.clientRepository.save(new ClientEntity());
    }

    async findById(id: string, throwsError = true) {
        this.logger.log(`Finding Client configuration with ID: '${id}'`);
        const byId = await this.clientRepository.findOneById(id);

        if (!byId && throwsError) {
            throw new NotFoundException(`Couldn't find Client with ID: '${id}'`);
        }
        return byId;
    }

    async update(client: ClientEntity) {
        this.logger.log(`Updating Client configuration with ID: '${client.id}'`);
        const byId = await this.findById(client.id, false);

        if (!byId) {
            throw new NotFoundException(`Could not update client with ID: '${client.id}' because it does not exist`);
        }
        return await this.clientRepository.save(client);
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
