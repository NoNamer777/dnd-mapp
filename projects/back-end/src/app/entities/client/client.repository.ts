import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientRepository extends Repository<ClientEntity> {
    constructor(dataSource: DataSource) {
        super(ClientEntity, dataSource.createEntityManager());
    }

    async findAll() {
        return await this.find();
    }

    async findOneById(id: string) {
        return await this.findOneBy({ id });
    }

    async deleteById(id: string) {
        await this.delete({ id });
    }
}
