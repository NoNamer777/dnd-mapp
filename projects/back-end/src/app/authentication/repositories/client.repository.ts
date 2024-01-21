import { ClientModel } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClientEntity } from '../entities';

@Injectable()
export class ClientRepository extends Repository<ClientModel> {
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
