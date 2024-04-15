import { AbilityModel, AbilityName, CreateAbilityData } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from '../../config';

@Injectable()
export class AbilityRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll() {
        return plainToInstance(
            AbilityModel,
            (await this.databaseService.ability.findMany({
                orderBy: { name: 'asc' },
                include: {
                    skills: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            })) as unknown[]
        );
    }

    async findOneById(id: string) {
        return plainToInstance(
            AbilityModel,
            await this.databaseService.ability.findUnique({
                where: { id },
                include: {
                    skills: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            })
        );
    }

    async findOneByName(name: AbilityName) {
        return plainToInstance(
            AbilityModel,
            await this.databaseService.ability.findUnique({
                where: { name },
                include: {
                    skills: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            })
        );
    }

    async update(ability: AbilityModel) {
        return plainToInstance(
            AbilityModel,
            await this.databaseService.ability.update({
                where: { id: ability.id },
                data: {
                    ...ability,
                    skills: { set: ability.skills.map((skill) => ({ id: skill.id, name: skill.name })) },
                },
                include: {
                    skills: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            })
        );
    }

    async create(ability: CreateAbilityData) {
        return plainToInstance(
            AbilityModel,
            await this.databaseService.ability.create({
                data: {
                    ...ability,
                    id: createId(),
                    skills: {},
                },
                include: {
                    skills: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            })
        );
    }

    async remove(id: string) {
        await this.databaseService.ability.delete({ where: { id } });
    }
}
