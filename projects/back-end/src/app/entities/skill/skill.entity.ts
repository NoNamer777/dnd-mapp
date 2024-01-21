import { SkillModel } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { EntitySchema } from 'typeorm';

export const SkillEntity = new EntitySchema<SkillModel>({
    name: 'Skill',
    columns: {
        id: {
            name: 'id',
            type: Number,
            primary: true,
            generated: 'increment',
            primaryKeyConstraintName: 'pk_skill',
        },
        name: {
            name: 'name',
            type: String,
            nullable: false,
        },
    },
    uniques: [
        {
            name: 'unique_idx_skill_nane',
            columns: ['name'],
        },
    ],
    relations: {
        ability: {
            type: 'many-to-one',
            target: 'Ability',
            nullable: false,
            lazy: true,
            joinColumn: {
                name: 'ability_id',
                referencedColumnName: 'id',
                foreignKeyConstraintName: 'fk_skill_ability',
            },
        },
    },
});

export class CreateSkillData extends OmitType(SkillModel, ['id'] as const) {}
