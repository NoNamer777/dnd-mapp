import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityCrudService } from '../../common';
import { AbilityEntity } from './ability.entity';

@Injectable()
export class AbilityService extends BaseEntityCrudService<AbilityEntity> {
    constructor(@InjectRepository(AbilityEntity) private abilityRepository: Repository<AbilityEntity>) {
        super(abilityRepository, 'Ability');
    }

    protected override async isEntityUnique(ability: AbilityEntity) {
        const byName = await this.findByName(ability.name, false);

        if (ability?.id !== byName?.id || byName) {
            return { error: `The name '${ability.name}' is already used for Ability with ID: '${byName.id}'.` };
        }
        return null;
    }

    async findByName(name: string, throwsError = true): Promise<AbilityEntity> {
        const byName = await this.abilityRepository.findOneBy({ name: name });

        if (!byName && throwsError) {
            throw new NotFoundException(`Ability with name: '${name}' is not found.`);
        }
        return byName;
    }
}
