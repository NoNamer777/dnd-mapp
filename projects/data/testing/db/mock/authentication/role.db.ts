import { CreateRoleData, RoleBuilder, RoleModel, RoleName } from '../../../../src';

interface RoleDb {
    [id: string]: RoleModel;
}

class MockRoleDB {
    private db: RoleDb;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db).sort((current, next) => current.name.localeCompare(next.name));
    }

    findOneById(id: string) {
        return Object.values(this.db).find((role) => role.id === id) ?? null;
    }

    findOneByName(name: RoleName) {
        return Object.values(this.db).find((role) => role.name === name) ?? null;
    }

    update(role: RoleModel) {
        this.db[role.id] = role;
        return role;
    }

    create(role: CreateRoleData) {
        const newRole = new RoleBuilder().withId().withName(role.name).build();

        this.db[newRole.id] = newRole;
        return newRole;
    }

    remove(id: string) {
        delete this.db[id];
    }

    reset() {
        defaultRole = new RoleBuilder().withId().withName('Player').build();
        this.db = { [defaultRole.id]: defaultRole };
    }
}

export let defaultRole: RoleModel;

export const mockRoleDB = new MockRoleDB();
