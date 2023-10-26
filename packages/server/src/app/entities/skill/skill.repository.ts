import { FactoryProvider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SkillEntity } from './skill.entity';

export interface SkillRepository extends Repository<SkillEntity> {
    this: Repository<SkillEntity>;

    findAll(): Promise<SkillEntity[]>;
    findAllByAbility(abilityId: number): Promise<SkillEntity[]>;
    findOneById(skillId: number): Promise<SkillEntity | null>;
    findOneByName(skillName: string): Promise<SkillEntity | null>;
    deleteById(skillId: number): Promise<void>;
}

export const skillRepositoryProvider: FactoryProvider<Repository<SkillEntity>> = {
    provide: getRepositoryToken(SkillEntity),
    inject: [getDataSourceToken()],
    useFactory: (datasource: DataSource) => datasource.getRepository(SkillEntity).extend(skillRepository),
};

const skillRepository: Pick<
    SkillRepository,
    'findAll' | 'findAllByAbility' | 'findOneById' | 'findOneByName' | 'deleteById'
> = {
    async findAll(this: Repository<SkillEntity>) {
        return await this.find({ order: { id: 'ASC' }, relations: ['ability'] });
    },

    async findAllByAbility(this: Repository<SkillEntity>, abilityId: number) {
        return this.find({
            order: { id: 'ASC' },
            relations: ['ability'],
            where: { ability: { id: abilityId } },
        });
    },

    async findOneById(this: Repository<SkillEntity>, skillId: number) {
        return await this.findOneBy({ id: skillId });
    },

    async findOneByName(this: Repository<SkillEntity>, name: string) {
        return await this.findOneBy({ name });
    },

    async deleteById(this: Repository<SkillEntity>, skillId: number) {
        await this.delete({ id: skillId });
    },
};
