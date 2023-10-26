import { FactoryProvider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AbilityEntity } from './ability.entity';

export interface AbilityRepository extends Repository<AbilityEntity> {
    this: Repository<AbilityEntity>;

    findAll(): Promise<AbilityEntity[]>;
    findOneById(abilityId: number): Promise<AbilityEntity | null>;
    findOneByName(abilityName: string): Promise<AbilityEntity | null>;
    deleteById(abilityId: number): Promise<void>;
}

export const abilityRepositoryProvider: FactoryProvider<Repository<AbilityEntity>> = {
    provide: getRepositoryToken(AbilityEntity),
    inject: [getDataSourceToken()],
    useFactory: (datasource: DataSource) => datasource.getRepository(AbilityEntity).extend(abilityRepository),
};

const abilityRepository: Pick<AbilityRepository, 'findAll' | 'findOneById' | 'findOneByName' | 'deleteById'> = {
    async findAll() {
        return await this.find({ order: { id: 'ASC' } });
    },

    async findOneById(abilityId: number) {
        return await this.findOneBy({ id: abilityId });
    },

    async findOneByName(abilityName: string) {
        return await this.findOneBy({ name: abilityName });
    },

    async deleteById(abilityId: number) {
        await this.delete({ id: abilityId });
    },
};
