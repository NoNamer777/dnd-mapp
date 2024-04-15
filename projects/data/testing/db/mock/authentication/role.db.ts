import { createId } from '@paralleldrive/cuid2';
import { CreateRoleData, RoleBuilder, RoleModel, Roles } from '../../../../src';

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

    findOneByName(name: string) {
        return Object.values(this.db).find((role) => role.name === name) ?? null;
    }

    update(role: RoleModel) {
        if (!this.db[role.id]) {
            throw new Error(`Could not update Role with ID: '${role.id}' because it does not exist.`);
        }
        this.db[role.id] = role;
        return role;
    }

    create(role: CreateRoleData) {
        const newRole = new RoleBuilder().withId(createId()).withName(role.name).build();

        this.db[newRole.id] = newRole;
        return newRole;
    }

    remove(id: string) {
        if (!this.db[id]) {
            throw new Error(`Cannot delete Role with ID: '${id}' because it does not exist.`);
        }
        delete this.db[id];
    }

    reset() {
        defaultRole = new RoleBuilder().withId(createId()).withName(Roles.PLAYER).build();
        this.db = { [defaultRole.id]: defaultRole };
    }
}

export let defaultRole: RoleModel;

export const mockRoleDB = new MockRoleDB();
