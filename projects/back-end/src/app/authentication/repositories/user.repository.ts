import { CreateUserData, UserModel } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from '../../config';

@Injectable()
export class UserRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll() {
        return plainToInstance(
            UserModel,
            await this.databaseService.user.findMany({
                orderBy: [{ username: 'asc' }],
                include: { roles: true },
            })
        );
    }

    async findOneById(id: string) {
        return plainToInstance(
            UserModel,
            await this.databaseService.user.findUnique({
                where: { id },
                include: { roles: true },
            })
        );
    }

    async findOneByUsername(username: string) {
        return plainToInstance(
            UserModel,
            await this.databaseService.user.findUnique({
                where: { username },
                include: { roles: true },
            })
        );
    }

    async remove(id: string) {
        await this.databaseService.user.delete({ where: { id } });
    }

    async update(user: UserModel) {
        return plainToInstance(
            UserModel,
            await this.databaseService.user.update({
                where: { id: user.id },
                data: {
                    ...user,
                    roles: {
                        upsert: user.roles.map((role) => ({
                            where: {
                                userId_roleId: {
                                    userId: user.id,
                                    roleId: role.id,
                                },
                            },
                            update: {
                                roleId: role.id,
                            },
                            create: {
                                roleId: role.id,
                            },
                        })),
                    },
                },
            })
        );
    }

    async create(user: CreateUserData) {
        const id = createId();

        return plainToInstance(
            UserModel,
            await this.databaseService.user.create({
                data: {
                    id: id,
                    username: user.username,
                    password: user.password,
                    emailAddress: user.emailAddress,
                    roles: {
                        connect: user.roles.map((role) => ({
                            userId_roleId: {
                                userId: id,
                                roleId: role.id,
                            },
                        })),
                    },
                },
            })
        );
    }
}
