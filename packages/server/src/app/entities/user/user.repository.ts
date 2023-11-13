import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    async findAll() {
        return await this.find({ relations: ['roles'], order: { id: 'ASC' } });
    }

    async findOneById(id: number) {
        return await this.findOne({ relations: ['roles'], where: { id } });
    }

    async findOneByUsername(username: string) {
        return await this.findOne({ relations: ['roles'], where: { username } });
    }

    async deleteById(id: number) {
        await this.delete({ id });
    }
}
