import { CreateUserData, UserBuilder, UserModel } from '../../../../src';
import { defaultRole } from './role.db';

interface UserDB {
    [userId: string]: UserModel;
}

class MockUserDB {
    private db: UserDB;
    private nextId: number;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db).sort((r1, r2) => r1.id - r2.id);
    }

    findOneById(userId: number) {
        return Object.values(this.db).find((user) => user.id === userId) ?? null;
    }

    findOneByUsername(username: string) {
        return Object.values(this.db).find((user) => user.username === username) ?? null;
    }

    save(userData: UserModel) {
        return userData.id ? this.update(userData) : this.insert(userData);
    }

    insert(userData: CreateUserData) {
        const newUser = new UserBuilder()
            .withId(this.nextId++)
            .withUsername(userData.username)
            .withPassword(userData.password)
            .withEmailAddress(userData.emailAddress)
            .withRoles([defaultRole])
            .build();

        this.db[newUser.id] = newUser;
        return newUser;
    }

    update(userData: UserModel) {
        if (!this.db[userData.id]) {
            throw new Error(`Could not update User with ID: '${userData.id}' because it does not exist.`);
        }
        this.db[userData.id] = userData;
        return userData;
    }

    deleteById(userId: number) {
        if (!this.db[userId]) {
            throw new Error(`Cannot delete User with ID: '${userId}' because it does not exist.`);
        }
        delete this.db[userId];
    }

    reset() {
        defaultUser = new UserBuilder()
            .withId(1)
            .withUsername('User1')
            .withPassword('$2b$12$CU2n8T1reHQ24urHR3HFFO.LMmw6zGEHKtfkwuiTyemO1Mz.68Psa')
            .withEmailAddress('user1@domain.com')
            .withRoles([defaultRole])
            .build();

        this.db = { [defaultUser.id]: defaultUser };
        this.nextId = 2;
    }
}

export let defaultUser: UserModel;

export const mockUserDB = new MockUserDB();
