import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RaceEntity } from './race.entity';

@Injectable()
export class RaceRepository extends Repository<RaceEntity> {
    constructor(dataSource: DataSource) {
        super(RaceEntity, dataSource.createEntityManager());
    }

    async findAll() {
        return await this.find({ order: { id: 'ASC' } });
    }

    async findOneById(id: number) {
        return await this.findOneBy({ id });
    }

    async findOneByName(name: string) {
        return await this.findOneBy({ name });
    }

    async deleteById(id: number) {
        await this.delete({ id });
    }
}
