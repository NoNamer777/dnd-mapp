import { UserModel } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserModel> {
    constructor(datasource: DataSource) {
        super('User', datasource.createEntityManager());
    }

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
