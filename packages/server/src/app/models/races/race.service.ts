import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RACE_REPO_TOKEN } from '../../providers';
import { Race } from '@dnd-mapp/data';

@Injectable()
export class RaceService {
    constructor(@Inject(RACE_REPO_TOKEN) private raceRepository) {}

    async getAll(): Promise<Race[]> {
        return this.raceRepository.findAll();
    }

    async getById(raceId: number): Promise<Race> {
        const raceById = this.raceRepository.findById(raceId);

        if (!raceById) {
            throw new NotFoundException(`Race with ID: '${raceId}' is not found.`);
        }
        return raceById;
    }

    async getByName(raceName: string): Promise<Race> {
        const raceByName = this.raceRepository.findByName(raceName);

        if (!raceByName) {
            throw new NotFoundException(`Race with name: '${raceName}' is not found.`);
        }
        return raceByName;
    }
}
