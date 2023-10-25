import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export class UserRepository extends Repository<UserEntity> {
    async findAll() {
        return await this.find({ order: { id: 'ASC' } });
    }

    async findOneById(userId: number) {
        return await this.findOneBy({ id: userId });
    }

    async findOneByUsername(username: string) {
        return await this.findOneBy({ username: username });
    }

    async deleteById(userId: number) {
        await this.delete({ id: userId });
    }
}
