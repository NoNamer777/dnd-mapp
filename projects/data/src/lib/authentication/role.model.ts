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
}

export type CreateRoleData = Omit<RoleModel, 'id'>;

export class RoleBuilder {
    private readonly role = new RoleModel();

    build() {
        return this.role;
    }

    withId(id: number) {
        this.role.id = id;

        return this;
    }

    withName(name: RoleName) {
        this.role.name = name;

        return this;
    }
}
