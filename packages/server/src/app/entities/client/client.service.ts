import { Injectable, NotFoundException } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
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

    /**
     * Will create a Client with a new ID and secret.
     * If an ID is provided, it'll find an existing client and only create a new secret.
     * @param {string} [id=] - The ID of the client to update
     */
    async register(id?: string) {
        const secret = await this.generateClientSecret();
        let client: ClientEntity;

        if (id) {
            client = await this.findById(id, false);
        } else {
            client = new ClientEntity();
            client.id = nanoid(32);
        }
        client.secret = secret.hash;

        await this.clientRepository.save(client);

        client.secret = secret.plain;
        return client;
    }

    async remove(id: string) {
        if (!(await this.findById(id, false))) {
            throw new NotFoundException(`Couldn't remove Client by ID: '${id}' because it does not exist`);
        }
        await this.clientRepository.deleteById(id);
    }

    /**
     * Generates a client secret and a hash of it.
     * @private
     */
    private async generateClientSecret() {
        const secret = randomBytes(48).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

        return {
            plain: secret,
            hash: await hash(secret, await genSalt(12)),
        };
    }
}
