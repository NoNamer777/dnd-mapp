import { FactoryProvider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RaceEntity } from './race.entity';

export interface RaceRepository extends Repository<RaceEntity> {
    this: Repository<RaceEntity>;

    findAll(): Promise<RaceEntity[]>;
    findOneById(raceId: number): Promise<RaceEntity | null>;
    findOneByName(raceName: string): Promise<RaceEntity | null>;
    deleteById(raceId: number): Promise<void>;
}

export const raceRepositoryProvider: FactoryProvider<Repository<RaceEntity>> = {
    provide: getRepositoryToken(RaceEntity),
    inject: [getDataSourceToken()],
    useFactory: (datasource: DataSource) => datasource.getRepository(RaceEntity).extend(raceRepository),
};

const raceRepository: Pick<RaceRepository, 'findAll' | 'findOneById' | 'findOneByName' | 'deleteById'> = {
    async findAll(this: Repository<RaceEntity>) {
        return await this.find({ order: { id: 'ASC' } });
    },

    async findOneById(this: Repository<RaceEntity>, raceId: number) {
        return await this.findOneBy({ id: raceId });
    },

    async findOneByName(this: Repository<RaceEntity>, raceName: string) {
        return await this.findOneBy({ name: raceName });
    },

    async deleteById(this: Repository<RaceEntity>, raceId: number) {
        await this.delete({ id: raceId });
    },
};
