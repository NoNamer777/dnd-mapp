import { RoleModel, RoleName } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends Repository<RoleModel> {
    constructor(datasource: DataSource) {
        super('Role', datasource.createEntityManager());
    }

    async findAll() {
        return await this.find({ order: { id: 'ASC' } });
    }

    async findOneById(id: number) {
        return await this.findOneBy({ id });
    }

    async findOneByName(name: RoleName) {
        return await this.findOneBy({ name });
    }

    async deleteById(id: number) {
        await this.delete({ id });
    }
}
