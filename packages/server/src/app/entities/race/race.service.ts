import { Race } from '@dnd-mapp/data';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityCrudService } from '../../common';
import { RaceEntity } from './race.entity';

@Injectable()
export class RaceService extends BaseEntityCrudService<Race> {
    constructor(@InjectRepository(RaceEntity) private raceRepository: Repository<RaceEntity>) {
        super(raceRepository, 'Race');
    }

    protected override async isEntityUnique(raceData: Race) {
        const byName = await this.findByName(raceData.name, false);

        if ((byName && byName.id !== raceData?.id) || byName) {
            return { error: `The name '${raceData.name}' is already used for Race with ID: '${byName.id}'` };
        }
        return null;
    }

    async findByName(name: string, throwsError = true): Promise<Race> {
        const byName = await this.raceRepository.findOneBy({ name: name });

        if (throwsError && !byName) {
            throw new NotFoundException(`Race with name: '${name}' is not found`);
        }
        return byName;
    }
}
