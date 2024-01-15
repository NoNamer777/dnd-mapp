import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { DndMappLoggerService } from '../../common';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
    constructor(
        private readonly logger: DndMappLoggerService,
        private readonly clientRepository: ClientRepository
    ) {
        this.logger.setContext(ClientService.name);
    }

    async findById(id: string, throwsError = true) {
        const byId = await this.clientRepository.findOneById(id);

        if (!byId && throwsError) {
            throw new NotFoundException(`Couldn't find Client with ID: '${id}'`);
        }
        return byId;
    }

    async register() {
        const client = new ClientEntity();
        client.id = nanoid(32);

        await this.clientRepository.save(client);
        return client;
    }

    async remove(id: string) {
        if (!(await this.findById(id, false))) {
            throw new NotFoundException(`Couldn't remove Client by ID: '${id}' because it does not exist`);
        }
        await this.clientRepository.deleteById(id);
    }
}
