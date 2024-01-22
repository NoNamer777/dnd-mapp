import { SkillModel, SkillName } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SkillEntity } from './skill.entity';

@Injectable()
export class SkillRepository extends Repository<SkillModel> {
    constructor(datasource: DataSource) {
        super(SkillEntity, datasource.createEntityManager());
    }

    async findAll() {
        return await this.find({ order: { id: 'ASC' }, relations: ['ability'] });
    }

    async findAllByAbility(id: number) {
        return this.find({
            order: { id: 'ASC' },
            relations: ['ability'],
            where: { ability: { id } },
        });
    }

    async findOneById(id: number) {
        return await this.findOne({ where: { id }, relations: ['ability'] });
    }

    async findOneByName(name: SkillName) {
        return await this.findOne({ where: { name }, relations: ['ability'] });
    }

    async deleteById(id: number) {
        await this.delete({ id });
    }
}
