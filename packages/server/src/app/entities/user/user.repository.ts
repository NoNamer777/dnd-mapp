import { FactoryProvider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export class UserRepository extends Repository<UserEntity> {
    async findAll() {
        return await this.find({ relations: ['roles'], order: { id: 'ASC' } });
    }

    async findOneById(id: number) {
        return await this.findOne({ relations: ['roles'], where: { id } });
    }

    async findOneByUsername(username: string) {
        return await this.findOne({ relations: ['roles'], where: { username } });
    }

    async deleteById(id: number) {
        await this.delete({ id });
    }
}

export const userRepositoryProvider: FactoryProvider<Repository<UserEntity>> = {
    provide: getRepositoryToken(UserEntity),
    inject: [getDataSourceToken()],
    useFactory: (datasource: DataSource) => datasource.getRepository(UserEntity).extend(UserRepository),
};
