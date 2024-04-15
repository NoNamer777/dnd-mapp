import { RoleModel } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from '../../config';

@Injectable()
export class RoleRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll() {
        return plainToInstance(RoleModel, await this.databaseService.role.findMany());
    }

    async findOneById(id: string) {
        return plainToInstance(RoleModel, await this.databaseService.role.findUnique({ where: { id } }));
    }

    async findOneByName(name: string) {
        return plainToInstance(RoleModel, await this.databaseService.role.findUnique({ where: { name } }));
    }

    async update(role: RoleModel) {
        return plainToInstance(
            RoleModel,
            await this.databaseService.role.update({
                where: { id: role.id },
                data: {
                    ...role,
                    id: createId(),
                },
            })
        );
    }

    async create(role: Omit<RoleModel, 'id'>) {
        return plainToInstance(
            RoleModel,
            await this.databaseService.role.create({
                data: {
                    ...role,
                    id: createId(),
                },
            })
        );
    }

    async remove(id: string) {
        await this.databaseService.role.delete({ where: { id } });
    }
}
