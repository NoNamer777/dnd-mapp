import { EntitySchema } from 'typeorm';

export const RoleEntity = new EntitySchema({
    name: 'Role',
    columns: {
        id: {
            name: 'id',
            type: Number,
            primary: true,
            generated: 'increment',
            primaryKeyConstraintName: 'pk_role',
        },
        name: {
            name: 'name',
            type: String,
            nullable: false,
        },
    },
    uniques: [
        {
            name: 'unique_role_name',
            columns: ['name'],
        },
    ],
});
