import { Skill } from '@dnd-mapp/data';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DndMappLoggerService } from '../../common';
import { CreateSkillDto, SkillEntity } from './skill.entity';
import { SkillRepository } from './skill.repository';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(SkillEntity) private readonly skillRepository: SkillRepository,
        private readonly logger: DndMappLoggerService
    ) {
        this.logger.setContext(SkillService.name);
    }

    async findAll(): Promise<Skill[]> {
        this.logger.log('Finding all Skills');
        return this.skillRepository.findAll();
    }

    async findAllOfAbility(abilityId: number): Promise<Skill[]> {
        this.logger.log('Finding all Skills of an Ability');
        return this.skillRepository.findAllByAbility(abilityId);
    }

    async findById(skillId: number, throwsError = true): Promise<Skill> {
        this.logger.log('Finding a Skill by ID');
        const byId = await this.skillRepository.findOneById(skillId);

        if (!byId && throwsError) {
            throw new NotFoundException(`Skill with ID: '${skillId}' is not found`);
        }
        return byId;
    }

    async findByName(skillName: string, throwsError = true): Promise<Skill> {
        this.logger.log('Finding a Skill by name');
        const byName = await this.skillRepository.findOneByName(skillName);

        if (!byName && throwsError) {
            throw new NotFoundException(`Skill with name: '${skillName}' is not found`);
        }
        return byName;
    }

    async update(skill: Skill): Promise<Skill> {
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

    async create(skill: CreateSkillDto): Promise<Skill> {
        this.logger.log('Creating a new Skill');
        const byName = await this.findByName(skill.name, false);

        if (byName) {
            throw new BadRequestException(`Cannot create Skill because the name '${byName.name}' is already used`);
        }
        return await this.skillRepository.save(skill);
    }

    async remove(skillId: number): Promise<void> {
        this.logger.log('Removing a Skill by ID');
        const byId = await this.findById(skillId, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove Skill with ID: '${skillId}' because it does not exist`);
        }
        await this.skillRepository.deleteById(skillId);
    }
}
