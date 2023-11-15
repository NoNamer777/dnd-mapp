import { UserRoleName } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

@Injectable()
export class UserRoleRepository extends Repository<UserRoleEntity> {
    constructor(datasource: DataSource) {
        super(UserRoleEntity, datasource.createEntityManager());
    }

    async findAll() {
        return await this.find({ order: { id: 'ASC' } });
    }

    async findOneById(id: number) {
        return await this.findOneBy({ id });
    }

    async findOneByName(name: UserRoleName) {
        return await this.findOneBy({ name });
    }

    async deleteById(id: number) {
        await this.delete({ id });
    }
}
