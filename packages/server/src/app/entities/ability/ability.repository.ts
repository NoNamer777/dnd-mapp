import { Repository } from 'typeorm';
import { AbilityEntity } from './ability.entity';

export class AbilityRepository extends Repository<AbilityEntity> {
    async findAll() {
        return await this.find({ order: { id: 'ASC' } });
    }

    async findOneById(abilityId: number) {
        return await this.findOneBy({ id: abilityId });
    }

    async findOneByName(abilityName: string) {
        return await this.findOneBy({ name: abilityName });
    }

    async deleteById(abilityId: number) {
        await this.delete({ id: abilityId });
    }
}
