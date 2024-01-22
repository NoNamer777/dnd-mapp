import { AbilityModel, AbilityName } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AbilityEntity } from './ability.entity';

@Injectable()
export class AbilityRepository extends Repository<AbilityModel> {
    constructor(datasource: DataSource) {
        super(AbilityEntity, datasource.createEntityManager());
    }

    async findAll() {
        return await this.find({ order: { id: 'ASC' }, select: ['skills'] });
    }

    async findOneById(id: number) {
        return await this.findOneBy({ id });
    }

    async findOneByName(name: AbilityName) {
        return await this.findOneBy({ name });
    }

    async deleteById(id: number) {
        await this.delete({ id });
    }
}
