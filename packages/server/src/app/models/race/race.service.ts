import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RACE_REPO_TOKEN } from '../../providers';
import { CreateRaceData, Race } from '@dnd-mapp/data';

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

    async update(raceData: Race): Promise<Race> {
        if (!(await this.doesRaceExistById(raceData.id))) {
            throw new NotFoundException(`Cannot update Race with ID: '${raceData.id}' because it does not exist.`);
        }
        const raceByName = await this.doesRaceExistByName(raceData.name);

        if (raceByName && raceByName.id !== raceData.id) {
            throw new BadRequestException(
                `Cannot update Race with ID: '${raceData.id}' because the name: '${raceData.name}' is already in use by another Race (ID: '${raceByName.id}').`
            );
        }
        return this.raceRepository.update(raceData);
    }

    async create(raceData: CreateRaceData): Promise<Race> {
        const raceByName = await this.doesRaceExistByName(raceData.name);

        if (raceByName) {
            throw new BadRequestException(
                `Cannot create Race because the name: '${raceData.name}' is already in use by another Race (ID: '${raceByName.id}').`
            );
        }
        return this.raceRepository.create(raceData);
    }

    async deleteById(raceId: number): Promise<void> {
        if (!(await this.doesRaceExistById(raceId))) {
            throw new NotFoundException(`Could not remove Race with ID: '${raceId}' because it does not exist.`);
        }
        this.raceRepository.deleteById(raceId);
    }

    private async doesRaceExistById(raceId: number): Promise<Race> {
        try {
            return await this.getById(raceId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return null;
            }
            throw error;
        }
    }

    private async doesRaceExistByName(raceName: string): Promise<Race> {
        try {
            return await this.getByName(raceName);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return null;
            }
            throw error;
        }
    }
}
