import { CreateRoleData, RoleModel, Roles } from '../../../../src';

interface RoleDb {
    [id: string]: RoleModel;
}

class MockRoleDB {
    private db: RoleDb;
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

    save(role: RoleModel) {
        return role.id ? this.update(role) : this.insert(role);
    }

    insert(role: CreateRoleData) {
        const newRole: RoleModel = new RoleModel(this.nextId++, role.name);

        this.db[newRole.id] = newRole;
        return newRole;
    }

    update(role: RoleModel) {
        if (!this.db[role.id]) {
            throw new Error(`Could not update Role with ID: '${role.id}' because it does not exist.`);
        }
        this.db[role.id] = role;
        return role;
    }

    deleteById(id: number) {
        if (!this.db[id]) {
            throw new Error(`Cannot delete Role with ID: '${id}' because it does not exist.`);
        }
        delete this.db[id];
    }

    reset() {
        defaultRole = new RoleModel(1, Roles.PLAYER);
        this.db = { [defaultRole.id]: defaultRole };
        this.nextId = 2;
    }
}

export let defaultRole: RoleModel;

export const mockRoleDB = new MockRoleDB();
