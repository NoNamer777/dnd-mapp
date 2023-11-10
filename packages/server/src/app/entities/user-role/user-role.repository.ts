import { UserRoleName } from '@dnd-mapp/data';
import { FactoryProvider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

export class UserRoleRepository extends Repository<UserRoleEntity> {
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

export const userRoleRepositoryProvider: FactoryProvider<Repository<UserRoleEntity>> = {
    provide: getRepositoryToken(UserRoleEntity),
    inject: [getDataSourceToken()],
    useFactory: (datasource: DataSource) => datasource.getRepository(UserRoleEntity).extend(UserRoleRepository),
};
