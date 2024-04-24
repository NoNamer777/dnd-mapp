import { CreateUserData, UserBuilder, UserModel } from '../../../../src';
import { defaultRole } from './role.db';

interface UserDB {
    [userId: string]: UserModel;
}

class MockUserDB {
    private db: UserDB;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db).sort((current, next) => current.username.localeCompare(next.username));
    }

    findOneById(userId: string) {
        return Object.values(this.db).find((user) => user.id === userId) ?? null;
    }

    findOneByUsername(username: string) {
        return Object.values(this.db).find((user) => user.username === username) ?? null;
    }

    update(userData: UserModel) {
        this.db[userData.id] = userData;
        return userData;
    }

    create(userData: CreateUserData) {
        const newUser = new UserBuilder()
            .withId()
            .withUsername(userData.username)
            .withPassword(userData.password)
            .withEmailAddress(userData.emailAddress)
            .withRoles([defaultRole])
            .build();

        this.db[newUser.id] = newUser;
        return newUser;
    }

    remove(userId: string) {
        delete this.db[userId];
    }

    reset() {
        defaultUser = new UserBuilder()
            .withId()
            .withUsername('User1')
            .withPassword('$2b$12$CU2n8T1reHQ24urHR3HFFO.LMmw6zGEHKtfkwuiTyemO1Mz.68Psa')
            .withEmailAddress('user1@domain.com')
            .withRoles([defaultRole])
            .build();

        this.db = { [defaultUser.id]: defaultUser };
    }
}

export let defaultUser: UserModel;

export const mockUserDB = new MockUserDB();
