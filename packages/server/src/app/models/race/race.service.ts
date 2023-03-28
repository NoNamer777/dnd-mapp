import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaceData, Race } from '@dnd-mapp/data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaceEntity } from './race.entity';

@Injectable()
export class RaceService {
    constructor(@InjectRepository(RaceEntity) private raceRepository: Repository<RaceEntity>) {}

    async getAll(): Promise<Race[]> {
        return this.raceRepository.find();
    }

    async getById(raceId: number): Promise<Race> {
        const raceById = this.raceRepository.findOneBy({ id: raceId });

        if (!raceById) {
            throw new NotFoundException(`Race with ID: '${raceId}' is not found.`);
        }
        return raceById;
    }

    async getByName(raceName: string): Promise<Race> {
        const raceByName = this.raceRepository.findOneBy({ name: raceName });

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
        await this.raceRepository.update({ id: raceData.id }, raceData);

        return await this.getById(raceData.id);
    }

    async create(raceData: CreateRaceData): Promise<Race> {
        const raceByName = await this.doesRaceExistByName(raceData.name);

        if (raceByName) {
            throw new BadRequestException(
                `Cannot create Race because the name: '${raceData.name}' is already in use by another Race (ID: '${raceByName.id}').`
            );
        }
        await this.raceRepository.insert(raceData);

        return await this.getByName(raceData.name);
    }

    async deleteById(raceId: number): Promise<void> {
        if (!(await this.doesRaceExistById(raceId))) {
            throw new NotFoundException(`Could not remove Race with ID: '${raceId}' because it does not exist.`);
        }
        await this.raceRepository.delete({ id: raceId });
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
