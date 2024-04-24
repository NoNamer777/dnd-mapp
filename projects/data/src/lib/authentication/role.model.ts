import { createId } from '@paralleldrive/cuid2';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EntityModel } from '../models';

export const Roles = {
    ADMIN: 'Admin',
    PLAYER: 'Player',
    DUNGEON_MASTER: 'Dungeon Master',
} as const;

export type RoleName = (typeof Roles)[keyof typeof Roles];

export class RoleModel extends EntityModel {
    @IsString()
    @IsNotEmpty()
    @IsEnum(Roles)
    name: RoleName;
}

export type CreateRoleData = Omit<RoleModel, 'id'>;

export class RoleBuilder {
    private readonly role = new RoleModel();

    build() {
        return this.role;
    }

    withId(id?: string) {
        this.role.id = id ?? createId();

        return this;
    }

    withName(name: RoleName) {
        this.role.name = name;

        return this;
    }
}
