import { CreateUserRoleData, UserRole, UserRoles } from '../../../src';

interface UserRoleDB {
    [id: string]: UserRole;
}

class MockUserRoleDB {
    private db: UserRoleDB;
    private nextId: number;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db).sort((r1, r2) => r1.id - r2.id);
    }

    findOneById(id: number) {
        return Object.values(this.db).find((role) => role.id === id) ?? null;
    }

    findOneByName(name: string) {
        return Object.values(this.db).find((role) => role.name === name) ?? null;
    }

    save(role: UserRole) {
        return role.id ? this.update(role) : this.insert(role);
    }

    insert(role: CreateUserRoleData) {
        const newRole: UserRole = {
            id: this.nextId++,
            ...role,
        };

        this.db[newRole.id] = newRole;
        return newRole;
    }

    update(role: UserRole) {
        if (!this.db[role.id]) {
            throw new Error(`Could not update User with ID: '${role.id}' because it does not exist.`);
        }
        this.db[role.id] = role;
        return role;
    }

    deleteById(id: number) {
        if (!this.db[id]) {
            throw new Error(`Cannot delete User with ID: '${id}' because it does not exist.`);
        }
        delete this.db[id];
    }

    reset() {
        this.db = { [defaultUserRole.id]: defaultUserRole };
        this.nextId = Object.values(this.db).length + 1;
    }
}

export const defaultUserRole: UserRole = {
    id: 1,
    name: UserRoles.ADMIN,
};

export const mockUserRoleDB = new MockUserRoleDB();
