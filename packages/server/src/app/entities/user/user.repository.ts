import { FactoryProvider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export interface UserRepository extends Repository<UserEntity> {
    this: Repository<UserEntity>;

    findAll(): Promise<UserEntity[]>;
    findOneById(userid: number): Promise<UserEntity | null>;
    findOneByUsername(username: string): Promise<UserEntity | null>;
    deleteById(userId: number): Promise<void>;
}

export const userRepositoryProvider: FactoryProvider<Repository<UserEntity>> = {
    provide: getRepositoryToken(UserEntity),
    inject: [getDataSourceToken()],
    useFactory: (datasource: DataSource) => datasource.getRepository(UserEntity).extend(userRepository),
};

const userRepository: Pick<UserRepository, 'findAll' | 'findOneById' | 'findOneByUsername' | 'deleteById'> = {
    async findAll(this: Repository<UserEntity>) {
        return await this.find({ relations: ['roles'], order: { id: 'ASC' } });
    },

    async findOneById(this: Repository<UserEntity>, userId: number) {
        return await this.findOne({ relations: ['roles'], where: { id: userId } });
    },

    async findOneByUsername(this: Repository<UserEntity>, username: string) {
        return await this.findOne({ relations: ['roles'], where: { username: username } });
    },

    async deleteById(this: Repository<UserEntity>, userId: number) {
        await this.delete({ id: userId });
    },
};
