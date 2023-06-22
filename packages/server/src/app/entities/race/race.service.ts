import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Race } from '@dnd-mapp/data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaceEntity } from './race.entity';
import { BaseEntityCrudService, SaveOrUpdateOperation } from '../../common';

@Injectable()
export class RaceService extends BaseEntityCrudService<Race> {
    constructor(@InjectRepository(RaceEntity) private raceRepository: Repository<RaceEntity>) {
        super(raceRepository, 'Race');
    }

    override async checkUniqueAttributes(raceData: Race, operation: SaveOrUpdateOperation): Promise<void> {
        const byName = await this.findByName(raceData.name, false);

        if (byName || (byName && raceData.id && byName.id !== raceData.id)) {
            const errorMessage =
                operation === 'create'
                    ? `Cannot create Race because the name: '${raceData.name}' is already in use by another Race (ID: '${byName.id}').`
                    : `Cannot update Race with ID: '${raceData.id}' because the name: '${raceData.name}' is already in use by another Race (ID: '${byName.id}').`;

            throw new BadRequestException(errorMessage);
        }
    }

    async findByName(name: string, throwsError = true): Promise<Race> {
        const byName = await this.raceRepository.findOneBy({ name: name });

        if (throwsError && !byName) {
            throw new NotFoundException(`Race with name: '${name}' is not found.`);
        }
        return byName;
    }
}
