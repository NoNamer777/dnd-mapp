import { EntityModel } from '../models';
import { Role, RoleName } from './role.model';

export class UserModel extends EntityModel {
    username: string;
    password: string;
    emailAddress: string;
    roles: Role[];

    constructor(username: string, password: string, emailAddress: string, id?: number, roles?: Role[]) {
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
