import { EntityModel } from '../models';
import { UserRole, UserRoleName } from './user-role.model';

export interface UserModel extends EntityModel {
    username: string;
    password: string;
    emailAddress: string;
    roles: UserRole[];
}

export class User implements UserModel {
    id: number;
    username: string;
    password: string;
    emailAddress: string;
    roles: UserRole[];

    constructor(username: string, password: string, emailAddress: string, id?: number, roles?: UserRole[]) {
        if (!roles) {
            this.roles = [];
        }
        if (id) {
            this.id = id;
        }
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress;
        this.roles = roles || [];
    }

    hasRole(role: UserRoleName) {
        return this.roles.map((userRole) => userRole.name).includes(role);
    }
}

export type CreateUserData = Omit<User, 'id' | 'roles' | 'hasRole'>;
