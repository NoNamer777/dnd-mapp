import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EntityModel } from '../models';

export enum Roles {
    ADMIN = 'Admin',
    PLAYER = 'Player',
    DUNGEON_MASTER = 'Dungeon Master',
}

export type RoleName = (typeof Roles)[keyof typeof Roles];

export class RoleModel extends EntityModel {
    @IsString()
    @IsNotEmpty()
    @IsEnum(Roles)
    name: RoleName;

    constructor(id?: number, name?: RoleName) {
        super(id);

        if (name) this.name = name;
    }
}

export type CreateRoleData = Omit<RoleModel, 'id'>;
