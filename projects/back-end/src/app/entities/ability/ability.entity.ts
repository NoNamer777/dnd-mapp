import { AbilityModel } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { EntitySchema } from 'typeorm';

export const AbilityEntity = new EntitySchema<AbilityModel>({
    name: 'Ability',
    columns: {
        id: {
            name: 'id',
            type: Number,
            primary: true,
            generated: 'increment',
            primaryKeyConstraintName: 'pk_ability',
        },
        name: {
            name: 'name',
            type: String,
            nullable: false,
        },
    },
    uniques: [
        {
            name: 'unique_idx_ability_name',
            columns: ['name'],
        },
    ],
    relations: {
        skills: {
            type: 'one-to-many',
            target: 'Skill',
        },
    },
});

export class CreateAbilityData extends OmitType(AbilityModel, ['id'] as const) {}
