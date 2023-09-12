import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityCrudService, SaveOrUpdateOperation } from '../../common';
import { SkillEntity } from './skill.entity';

@Injectable()
export class SkillService extends BaseEntityCrudService<SkillEntity> {
    constructor(@InjectRepository(SkillEntity) private skillRepository: Repository<SkillEntity>) {
        super(skillRepository, 'Skill');
    }

    protected override async checkUniqueAttributes(
        skill: SkillEntity,
        operation: SaveOrUpdateOperation
    ): Promise<void> {
        const byName = await this.findByName(skill.name, false);

        if (byName || (byName && skill.id && byName.id !== skill.id)) {
            const errorMessage =
                operation === 'create'
                    ? `Cannot create Skill because the name: '${skill.name}' is already in use by another Skill (ID: '${byName.id}').`
                    : `Cannot update Skill with ID: '${skill.id}' because the name: '${skill.name}' is already in use by another Skill (ID: '${byName.id}').`;

            throw new BadRequestException(errorMessage);
        }
    }

    async findByName(name: string, throwsError = true): Promise<SkillEntity> {
        const byName = await this.skillRepository.findOneBy({ name: name });

        if (!byName && throwsError) {
            throw new NotFoundException(`Skill with name: '${name}' is not found.`);
        }
        return byName;
    }
}
