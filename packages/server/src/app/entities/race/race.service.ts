import { Race } from '@dnd-mapp/data';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DndMappLoggerService } from '../../common';
import { CreateRaceDto, RaceEntity } from './race.entity';
import { RaceRepository } from './race.repository';

@Injectable()
export class RaceService {
    constructor(
        @InjectRepository(RaceEntity) private readonly raceRepository: RaceRepository,
        private readonly logger: DndMappLoggerService
    ) {
        this.logger.setContext(RaceService.name);
    }

    async findAll(): Promise<Race[]> {
        this.logger.log('Finding all Races');
        return this.raceRepository.findAll();
    }

    async findById(raceId: number, throwsError = true): Promise<Race> {
        this.logger.log('Finding a Race by ID');
        const byId = await this.raceRepository.findOneById(raceId);

        if (!byId && throwsError) {
            throw new NotFoundException(`Race with ID: '${raceId}' is not found`);
        }
        return byId;
    }

    async findByName(raceName: string, throwsError = true): Promise<Race> {
        this.logger.log('Finding a Race by name');
        const byName = await this.raceRepository.findOneByName(raceName);

        if (!byName && throwsError) {
            throw new NotFoundException(`Race with name: '${raceName}' is not found`);
        }
        return byName;
    }

    async update(race: Race): Promise<Race> {
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

    async create(race: CreateRaceDto): Promise<Race> {
        this.logger.log('Creating a new Race');
        const byName = await this.findByName(race.name, false);

        if (byName) {
            throw new BadRequestException(`Cannot create Race because the name '${byName.name}' is already used`);
        }
        return await this.raceRepository.save(race);
    }

    async remove(raceId: number): Promise<void> {
        this.logger.log('Removing a Race by ID');
        const byId = await this.findById(raceId, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove Race with ID: '${raceId}' because it does not exist`);
        }
        await this.raceRepository.deleteById(raceId);
    }
}
