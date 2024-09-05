import { Exclude } from 'class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EntityModel } from '../models';
import { RoleModel, RoleName } from './role.model';

export class UserModel extends EntityModel {
    @IsString()
    @IsNotEmpty()
    username: string;

    @Exclude({ toPlainOnly: true })
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    roles: RoleModel[];

    hasRole(role: RoleName) {
        return this.roles.map((userRole) => userRole.name).includes(role);
    }
}

export type CreateUserData = Omit<UserModel, 'id' | 'roles' | 'hasRole'>;

export class UserBuilder {
    private readonly user = new UserModel();

    build() {
        return this.user;
    }

    withEmailAddress(emailAddress: string) {
        this.user.emailAddress = emailAddress;

        return this;
    }

    withId(id: number) {
        this.user.id = id;

        return this;
    }

    withPassword(password: string) {
        this.user.password = password;

        return this;
    }

    withRoles(roles: RoleModel[]) {
        this.user.roles = roles;

        return this;
    }

    withUsername(username: string) {
        this.user.username = username;

        return this;
    }
}
