import { EntityModel } from '../models';

export enum UserRoles {
    ADMIN = 'Admin',
    PLAYER = 'Player',
    DUNGEON_MASTER = 'Dungeon Master',
}

export type UserRoleName = (typeof UserRoles)[keyof typeof UserRoles];

export interface UserRole extends EntityModel {
    id: number;
    name: UserRoleName;
}

export type CreateUserRoleData = Omit<UserRole, 'id'>;
