import { FactoryProvider, Injectable } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SkillEntity } from './skill.entity';

@Injectable()
export class SkillRepository extends Repository<SkillEntity> {
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

    async findOneByName(name: string) {
        return await this.findOne({ where: { name }, relations: ['ability'] });
    }

    async deleteById(id: number) {
        await this.delete({ id });
    }
}

export const skillRepositoryProvider: FactoryProvider<Repository<SkillEntity>> = {
    provide: getRepositoryToken(SkillEntity),
    inject: [getDataSourceToken()],
    useFactory: (datasource: DataSource) => datasource.getRepository(SkillEntity).extend(SkillRepository),
};
