import { EntityModel } from '../models';

export enum Roles {
    ADMIN = 'Admin',
    PLAYER = 'Player',
    DUNGEON_MASTER = 'Dungeon Master',
}

export type RoleName = (typeof Roles)[keyof typeof Roles];

export interface Role extends EntityModel {
    id: number;
    name: RoleName;
}

export type CreateRoleData = Omit<Role, 'id'>;
