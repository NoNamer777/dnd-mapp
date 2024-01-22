import { CreateSkillData, SkillModel, SkillName } from '@dnd-mapp/data';
import { BadRequestException, Injectable, InjectionToken, NotFoundException, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '../../common';
import { EntityService } from '../entity.service';
import { EntityApiService } from '../models';
import { SkillRepository } from './skill.repository';

export const SKILL_SERVICE_TOKEN: InjectionToken = 'SKILL_SERVICE';

@Injectable()
export class SkillService implements EntityApiService<SkillModel>, OnModuleInit {
    constructor(
        private readonly skillRepository: SkillRepository,
        private readonly logger: LoggerService,
        private readonly entityService: EntityService
    ) {
        this.logger.setContext(SkillService.name);
    }

    onModuleInit() {
        this.entityService.addEntityType<SkillModel>({ type: 'Skill', serviceToken: SKILL_SERVICE_TOKEN });
    }

    async findAll() {
        this.logger.log('Finding all Skills');
        return this.skillRepository.findAll();
    }

    async findAllOfAbility(abilityId: number) {
        this.logger.log('Finding all Skills of an Ability');
        return this.skillRepository.findAllByAbility(abilityId);
    }

    async findById(id: number, throwsError = true) {
        this.logger.log('Finding a Skill by ID');
        const byId = await this.skillRepository.findOneById(id);

        if (!byId && throwsError) {
            throw new NotFoundException(`Skill with ID: '${id}' is not found`);
        }
        return byId;
    }

    async findByName(name: SkillName, throwsError = true) {
        this.logger.log('Finding a Skill by name');
        const byName = await this.skillRepository.findOneByName(name);

        if (!byName && throwsError) {
            throw new NotFoundException(`Skill with name: '${name}' is not found`);
        }
        return byName;
    }

    async update(skill: SkillModel) {
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

    async create(skill: CreateSkillData) {
        this.logger.log('Creating a new Skill');
        const byName = await this.findByName(skill.name, false);

        if (byName) {
            throw new BadRequestException(`Cannot create Skill because the name '${byName.name}' is already used`);
        }
        return await this.skillRepository.save(skill);
    }

    async remove(id: number) {
        this.logger.log('Removing a Skill by ID');
        const byId = await this.findById(id, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove Skill with ID: '${id}' because it does not exist`);
        }
        await this.skillRepository.deleteById(id);
    }
}
