import { CreateRaceData, RaceModel, RaceName } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from '../../config';

@Injectable()
export class RaceRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll() {
        return plainToInstance(
            RaceModel,
            (await this.databaseService.race.findMany({ orderBy: { name: 'asc' } })) as unknown[]
        );
    }

    async findOneById(id: string) {
        return plainToInstance(RaceModel, await this.databaseService.race.findUnique({ where: { id } }));
    }

    async findOneByName(name: RaceName) {
        return plainToInstance(RaceModel, await this.databaseService.race.findUnique({ where: { name } }));
    }

    async update(race: RaceModel) {
        return plainToInstance(
            RaceModel,
            await this.databaseService.race.update({
                where: { id: race.id },
                data: { ...race },
            })
        );
    }

    async create(race: CreateRaceData) {
        return plainToInstance(
            RaceModel,
            await this.databaseService.race.create({
                data: {
                    ...race,
                    id: createId(),
                },
            })
        );
    }

    async remove(id: string) {
        await this.databaseService.race.delete({ where: { id } });
    }
}
