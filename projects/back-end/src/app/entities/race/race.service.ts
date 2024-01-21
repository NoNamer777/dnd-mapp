import { CreateRaceData, Race } from '@dnd-mapp/data';
import { BadRequestException, Injectable, InjectionToken, NotFoundException, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '../../common';
import { EntityService } from '../entity.service';
import { EntityApiService } from '../models';
import { RaceRepository } from './race.repository';

export const RACE_SERVICE_TOKEN: InjectionToken = 'RACE_SERVICE';

@Injectable()
export class RaceService implements EntityApiService<Race>, OnModuleInit {
    constructor(
        private readonly raceRepository: RaceRepository,
        private readonly logger: LoggerService,
        private readonly entityService: EntityService
    ) {
        this.logger.setContext(RaceService.name);
    }

    onModuleInit() {
        this.entityService.addEntityType<Race>({ type: 'Race', serviceToken: RACE_SERVICE_TOKEN });
    }

    async findAll() {
        this.logger.log('Finding all Races');
        return this.raceRepository.findAll();
    }

    async findById(raceId: number, throwsError = true) {
        this.logger.log('Finding a Race by ID');
        const byId = await this.raceRepository.findOneById(raceId);

        if (!byId && throwsError) {
            throw new NotFoundException(`Race with ID: '${raceId}' is not found`);
        }
        return byId;
    }

    async findByName(raceName: string, throwsError = true) {
        this.logger.log('Finding a Race by name');
        const byName = await this.raceRepository.findOneByName(raceName);

        if (!byName && throwsError) {
            throw new NotFoundException(`Race with name: '${raceName}' is not found`);
        }
        return byName;
    }

    async update(race: Race) {
        this.logger.log(`Updating a Race's data`);
        const byId = await this.findById(race.id, false);
        const byName = await this.findByName(race.name, false);

        if (!byId) {
            throw new NotFoundException(`Cannot update Race with ID: '${race.id}' because it does not exist`);
        }
        if (byName && byName.id !== race.id) {
            throw new BadRequestException(`Cannot update Race because the name '${byName.name}' is already used`);
        }
        return await this.raceRepository.save(race);
    }

    async create(race: CreateRaceData) {
        this.logger.log('Creating a new Race');
        const byName = await this.findByName(race.name, false);

        if (byName) {
            throw new BadRequestException(`Cannot create Race because the name '${byName.name}' is already used`);
        }
        return await this.raceRepository.save(race);
    }

    async remove(raceId: number) {
        this.logger.log('Removing a Race by ID');
        const byId = await this.findById(raceId, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove Race with ID: '${raceId}' because it does not exist`);
        }
        await this.raceRepository.deleteById(raceId);
    }
}
