import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
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
        const client = new ClientEntity();
        client.id = nanoid(32);

        await this.clientRepository.save(client);
        return client;
    }

    async findById(id: string, throwsError = true) {
        this.logger.log(`Finding Client configuration with ID: '${id}'`);
        const byId = await this.clientRepository.findOneById(id);

        if (!byId && throwsError) {
            throw new NotFoundException(`Couldn't find Client with ID: '${id}'`);
        }
        return byId;
    }

    async remove(id: string) {
        this.logger.log(`Removing Client configuration with ID: '${id}'`);
        if (!(await this.findById(id, false))) {
            throw new NotFoundException(`Couldn't remove Client by ID: '${id}' because it does not exist`);
        }
        await this.clientRepository.deleteById(id);
    }
}
