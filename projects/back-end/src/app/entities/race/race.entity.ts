import { Race } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { EntitySchema } from 'typeorm';

export const RaceEntity = new EntitySchema<Race>({
    name: 'Race',
    columns: {
        id: {
            name: 'id',
            type: Number,
            primary: true,
            generated: 'increment',
            primaryKeyConstraintName: 'pk_race',
        },
        name: {
            name: 'name',
            type: String,
            nullable: false,
        },
    },
    uniques: [
        {
            name: 'unique_idx_race_name',
            columns: ['name'],
        },
    ],
});

export class CreateRaceData extends OmitType(Race, ['id'] as const) {}
