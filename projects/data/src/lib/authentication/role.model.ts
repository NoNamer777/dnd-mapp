import { EntityModel } from '../models';

export enum Roles {
    ADMIN = 'Admin',
    PLAYER = 'Player',
    DUNGEON_MASTER = 'Dungeon Master',
}

export type RoleName = (typeof Roles)[keyof typeof Roles];

export class Role extends EntityModel {
    name: RoleName;
}

export type CreateRoleData = Omit<Role, 'id'>;
