import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityCrudService } from '../../common';
import { SkillEntity } from './skill.entity';

@Injectable()
export class SkillService extends BaseEntityCrudService<SkillEntity> {
    constructor(@InjectRepository(SkillEntity) private skillRepository: Repository<SkillEntity>) {
        super(skillRepository, 'Skill');
    }

    protected override async isEntityUnique(skill: SkillEntity) {
        const byName = await this.findByName(skill.name, false);

        if ((byName && byName.id !== skill?.id) || byName) {
            return { error: `The name '${skill.name}' is already used for Skill with ID: '${byName.id}'` };
        }
        return null;
    }

    async findByName(name: string, throwsError = true): Promise<SkillEntity> {
        const byName = await this.skillRepository.findOneBy({ name: name });

        if (!byName && throwsError) {
            throw new NotFoundException(`Skill with name: '${name}' is not found`);
        }
        return byName;
    }
}
