import { BadRequestException, Injectable, InjectionToken, NotFoundException, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '../../common';
import { EntityService } from '../entity.service';
import { EntityApiService } from '../models';
import { CreateSkillDto, SkillEntity } from './skill.entity';
import { SkillRepository } from './skill.repository';

export const SKILL_SERVICE_TOKEN: InjectionToken = 'SKILL_SERVICE';

@Injectable()
export class SkillService implements EntityApiService<SkillEntity>, OnModuleInit {
    constructor(
        private readonly skillRepository: SkillRepository,
        private readonly logger: LoggerService,
        private readonly entityService: EntityService
    ) {
        this.logger.setContext(SkillService.name);
    }

    onModuleInit() {
        this.entityService.addEntityType<SkillEntity>({ type: 'Skill', serviceToken: SKILL_SERVICE_TOKEN });
    }

    async findAll() {
        this.logger.log('Finding all Skills');
        return this.skillRepository.findAll();
    }

    async findAllOfAbility(abilityId: number) {
        this.logger.log('Finding all Skills of an Ability');
        return this.skillRepository.findAllByAbility(abilityId);
    }

    async findById(skillId: number, throwsError = true) {
        this.logger.log('Finding a Skill by ID');
        const byId = await this.skillRepository.findOneById(skillId);

        if (!byId && throwsError) {
            throw new NotFoundException(`Skill with ID: '${skillId}' is not found`);
        }
        return byId;
    }

    async findByName(skillName: string, throwsError = true) {
        this.logger.log('Finding a Skill by name');
        const byName = await this.skillRepository.findOneByName(skillName);

        if (!byName && throwsError) {
            throw new NotFoundException(`Skill with name: '${skillName}' is not found`);
        }
        return byName;
    }

    async update(skill: SkillEntity) {
        this.logger.log(`Updating a Skill's data`);
        const byId = await this.findById(skill.id, false);

        if (!byId) {
            throw new NotFoundException(`Cannot update Skill with ID: '${skill.id}' because it does not exist`);
        }
        const byName = await this.findByName(skill.name, false);

        if (byName && byName.id !== skill.id) {
            throw new BadRequestException(`Cannot update Skill because the name '${byName.name}' is already used`);
        }
        return await this.skillRepository.save(skill);
    }

    async create(skill: CreateSkillDto) {
        this.logger.log('Creating a new Skill');
        const byName = await this.findByName(skill.name, false);

        if (byName) {
            throw new BadRequestException(`Cannot create Skill because the name '${byName.name}' is already used`);
        }
        return await this.skillRepository.save(skill);
    }

    async remove(skillId: number) {
        this.logger.log('Removing a Skill by ID');
        const byId = await this.findById(skillId, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove Skill with ID: '${skillId}' because it does not exist`);
        }
        await this.skillRepository.deleteById(skillId);
    }
}
