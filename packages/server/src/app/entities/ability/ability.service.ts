import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityCrudService, SaveOrUpdateOperation } from '../../common';
import { AbilityEntity } from './ability.entity';

@Injectable()
export class AbilityService extends BaseEntityCrudService<AbilityEntity> {
    constructor(@InjectRepository(AbilityEntity) private abilityRepository: Repository<AbilityEntity>) {
        super(abilityRepository, 'Ability');
    }

    protected override async checkUniqueAttributes(
        ability: AbilityEntity,
        operation: SaveOrUpdateOperation
    ): Promise<void> {
        const byName = await this.findByName(ability.name, false);

        if (byName || (byName && ability.id && byName.id !== ability.id)) {
            const errorMessage =
                operation === 'create'
                    ? `Cannot create Ability because the name: '${ability.name}' is already in use by another Ability (ID: '${byName.id}').`
                    : `Cannot update Ability with ID: '${ability.id}' because the name: '${ability.name}' is already in use by another Ability (ID: '${byName.id}').`;

            throw new BadRequestException(errorMessage);
        }
    }

    async findByName(name: string, throwsError = true): Promise<AbilityEntity> {
        const byName = await this.abilityRepository.findOneBy({ name: name });

        if (!byName && throwsError) {
            throw new NotFoundException(`Ability with name: '${name}' is not found.`);
        }
        return byName;
    }
}
