import { CreateUserData, User } from '../../../src';

interface UserDB {
    [userId: string]: User;
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

    save(userData: User) {
        return userData.id ? this.update(userData) : this.insert(userData);
    }

    insert(userData: CreateUserData) {
        const newUser: User = new User(
            userData.username,
            userData.password,
            userData.emailAddress,
            this.nextId++
            // userData.roles
        );

        this.db[newUser.id] = newUser;
        return newUser;
    }

    update(userData: User) {
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
        this.db = { [defaultUser.id]: defaultUser };
        this.nextId = Object.values(this.db).length + 1;
    }
}

export const defaultUser = new User(
    'User1',
    '$2b$12$CU2n8T1reHQ24urHR3HFFO.LMmw6zGEHKtfkwuiTyemO1Mz.68Psa',
    'user1@domain.com',
    1
);

export const mockUserDB = new MockUserDB();
