import { ArrayMinSize, ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EntityModel } from '../models';
import { RoleModel, RoleName } from './role.model';

export class UserModel extends EntityModel {
    static from(data: UserModel) {
        if (!data) return null;

        return new UserModel(data.username, data.password, data.emailAddress, data.id, data.roles);
    }

    @IsString()
    @IsNotEmpty()
    username: string;

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

    constructor(username: string, password: string, emailAddress: string, id?: number, roles?: RoleModel[]) {
        super(id);

        if (!roles) {
            this.roles = [];
        }
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress;
        this.roles = roles || [];
    }

    hasRole(role: RoleName) {
        return this.roles.map((userRole) => userRole.name).includes(role);
    }
}

export type CreateUserData = Omit<UserModel, 'id' | 'roles' | 'hasRole'>;
