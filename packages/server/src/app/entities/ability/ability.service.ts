import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DndMappLoggerService } from '../../common';
import { AbilityEntity, CreateAbilityDto } from './ability.entity';
import { AbilityRepository } from './ability.repository';

@Injectable()
export class AbilityService {
    constructor(
        private readonly abilityRepository: AbilityRepository,
        private readonly logger: DndMappLoggerService,
    ) {
        this.logger.setContext(AbilityService.name);
    }

    async findAll() {
        this.logger.log('Finding all Abilities');
        return this.abilityRepository.findAll();
    }

    async findById(id: number, throwsError = true) {
        this.logger.log('Finding an Ability by ID');
        const byId = await this.abilityRepository.findOneById(id);

        if (!byId && throwsError) {
            throw new NotFoundException(`Ability with ID: '${id}' is not found`);
        }
        return byId;
    }

    async findByName(name: string, throwsError = true) {
        this.logger.log('Finding an Ability by name');
        const byName = await this.abilityRepository.findOneByName(name);

        if (!byName && throwsError) {
            throw new NotFoundException(`Ability with name: '${name}' is not found`);
        }
        return byName;
    }

    async update(ability: AbilityEntity) {
        this.logger.log(`Updating an Ability's data`);
        const byId = await this.findById(ability.id, false);

        if (!byId) {
            throw new NotFoundException(`Cannot update Ability with ID: '${ability.id}' because it does not exist`);
        }
        const byName = await this.findByName(ability.name, false);

        if (byName && byName.id !== ability.id) {
            throw new BadRequestException(`Cannot update Ability because the name '${byName.name}' is already used`);
        }
        return await this.abilityRepository.save(ability);
    }

    async create(ability: CreateAbilityDto) {
        this.logger.log('Creating a new Ability');
        const byName = await this.findByName(ability.name, false);

        if (byName) {
            throw new BadRequestException(`Cannot create Ability because the name '${byName.name}' is already used`);
        }
        return await this.abilityRepository.save(ability);
    }

    async remove(id: number) {
        this.logger.log('Removing an Ability by ID');
        const byId = await this.findById(id, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove Ability with ID: '${id}' because it does not exist`);
        }
        await this.abilityRepository.deleteById(byId.id);
    }
}
