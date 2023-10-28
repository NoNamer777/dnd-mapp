import { UserRoleName } from '@dnd-mapp/data';
import { FactoryProvider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

export interface UserRoleRepository extends Repository<UserRoleEntity> {
    this: Repository<UserRoleEntity>;

    findAll(): Promise<UserRoleEntity[]>;
    findOneById(id: number): Promise<UserRoleEntity | null>;
    findOneByName(name: UserRoleName): Promise<UserRoleEntity | null>;
    deleteById(id: number): Promise<void>;
}

export const userRoleRepositoryProvider: FactoryProvider<Repository<UserRoleEntity>> = {
    provide: getRepositoryToken(UserRoleEntity),
    inject: [getDataSourceToken()],
    useFactory: (datasource: DataSource) => datasource.getRepository(UserRoleEntity).extend(userRoleRepository),
};

const userRoleRepository: Pick<UserRoleRepository, 'findAll' | 'findOneById' | 'findOneByName' | 'deleteById'> = {
    async findAll(this: Repository<UserRoleEntity>) {
        return await this.find({ order: { id: 'ASC' } });
    },

    async findOneById(this: Repository<UserRoleEntity>, id: number) {
        return await this.findOneBy({ id });
    },

    async findOneByName(this: Repository<UserRoleEntity>, name: UserRoleName) {
        return await this.findOneBy({ name });
    },

    async deleteById(this: Repository<UserRoleEntity>, id: number) {
        await this.delete({ id });
    },
};
