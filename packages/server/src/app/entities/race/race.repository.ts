import { Repository } from 'typeorm';
import { RaceEntity } from './race.entity';

export class RaceRepository extends Repository<RaceEntity> {
    async findAll() {
        return await this.find({ order: { id: 'ASC' } });
    }

    async findOneById(raceId: number) {
        return await this.findOneBy({ id: raceId });
    }

    async findOneByName(raceName: string) {
        return await this.findOneBy({ name: raceName });
    }

    async deleteById(raceId: number) {
        await this.delete({ id: raceId });
    }
}
