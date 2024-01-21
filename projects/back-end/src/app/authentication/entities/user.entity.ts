import { UserModel } from '@dnd-mapp/data';
import { PickType } from '@nestjs/mapped-types';
import { EntitySchema } from 'typeorm';

export const UserEntity = new EntitySchema<UserModel>({
    name: 'User',
    columns: {
        id: {
            name: 'id',
            type: Number,
            primary: true,
            generated: 'increment',
            primaryKeyConstraintName: 'pk_user',
        },
        username: {
            name: 'username',
            type: String,
            nullable: false,
        },
        password: {
            name: 'password',
            type: String,
            nullable: false,
        },
        emailAddress: {
            name: 'email_address',
            type: String,
            nullable: false,
        },
    },
    uniques: [
        {
            name: 'unique_idx_user_username',
            columns: ['username'],
        },
    ],
    indices: [
        {
            name: 'idx_user_email_address',
            columns: ['emailAddress'],
        },
    ],
    relations: {
        roles: {
            type: 'many-to-many',
            target: 'Role',
            eager: true,
            joinTable: {
                name: 'UserRole',
                joinColumn: {
                    name: 'user_id',
                    referencedColumnName: 'id',
                    foreignKeyConstraintName: 'fk_user_role',
                },
                inverseJoinColumn: {
                    name: 'role_id',
                    referencedColumnName: 'id',
                    foreignKeyConstraintName: 'fk_role_user',
                },
            },
        },
    },
});

export class CreateUserData extends PickType(UserModel, ['username', 'password', 'emailAddress'] as const) {}

export class UpdateUserData extends PickType(UserModel, [
    'id',
    'username',
    'password',
    'emailAddress',
    'roles',
] as const) {}
