import { Repository } from 'typeorm';
import { SkillEntity } from './skill.entity';

export class SkillRepository extends Repository<SkillEntity> {
    async findAll() {
        return await this.find({ order: { id: 'ASC' }, relations: ['ability'] });
    }

    async findAllByAbility(skillId: number) {
        return this.find({
            order: { id: 'ASC' },
            relations: ['ability'],
            where: { ability: { id: skillId } },
        });
    }

    async findOneById(skillId: number) {
        return await this.findOneBy({ id: skillId });
    }

    async findOneByName(name: string) {
        return await this.findOneBy({ name });
    }

    async deleteById(skillId: number) {
        await this.delete({ id: skillId });
    }
}
