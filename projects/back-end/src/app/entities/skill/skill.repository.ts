import { CreateSkillData, SkillModel, SkillName } from '@dnd-mapp/data';
import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from '../../config';

@Injectable()
export class SkillRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll() {
        return plainToInstance(
            SkillModel,
            (await this.databaseService.skill.findMany({
                orderBy: { name: 'asc' },
                select: {
                    id: true,
                    name: true,
                    ability: true,
                },
            })) as unknown[]
        );
    }

    async findAllByAbility(abilityId: string) {
        return plainToInstance(
            SkillModel,
            (await this.databaseService.skill.findMany({
                where: { ability: { id: abilityId } },
                orderBy: { name: 'asc' },
                select: {
                    id: true,
                    name: true,
                    ability: true,
                },
            })) as unknown[]
        );
    }

    async findOneById(id: string) {
        return plainToInstance(
            SkillModel,
            await this.databaseService.skill.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    ability: true,
                },
            })
        );
    }

    async findOneByName(name: SkillName) {
        return plainToInstance(
            SkillModel,
            await this.databaseService.skill.findUnique({
                where: { name },
                select: {
                    id: true,
                    name: true,
                    ability: true,
                },
            })
        );
    }

    async update(skill: SkillModel) {
        return plainToInstance(
            SkillModel,
            await this.databaseService.skill.update({
                where: { id: skill.id },
                data: {
                    ...skill,
                    ability: { connect: { id: skill.ability.id } },
                },
                select: {
                    id: true,
                    name: true,
                    ability: true,
                },
            })
        );
    }

    async create(skill: CreateSkillData) {
        return plainToInstance(
            SkillModel,
            await this.databaseService.skill.create({
                data: {
                    ...skill,
                    id: createId(),
                    ability: { connect: { id: skill.ability.id } },
                },
                select: {
                    id: true,
                    name: true,
                    ability: true,
                },
            })
        );
    }

    async remove(id: string) {
        await this.databaseService.skill.delete({ where: { id } });
    }
}
