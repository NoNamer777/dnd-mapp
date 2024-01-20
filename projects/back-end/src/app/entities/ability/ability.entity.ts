import { Ability } from '@dnd-mapp/data';
import { EntitySchema } from 'typeorm';

export const AbilityEntity = new EntitySchema<Ability>({
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
            eager: true,
        },
    },
});
