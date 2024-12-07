import { defaultUsers, generateDefaultUsers, User } from '@dnd-mapp/data';
import { MockDatabase } from './models';

export class MockUserDB {
    private records: MockDatabase<User> = {};

    public getAll() {
        return Object.values(this.records);
    }

    public getById(userId: string) {
        return this.records[userId] ?? null;
    }

    public remove(userId: string) {
        delete this.records[userId];
    }

    public reset(users: User[] = []) {
        this.records = users.reduce((records: MockDatabase<User>, user) => {
            records[user.id] = user;
            return records;
        }, {});
    }
}

export const mockUserDB = new MockUserDB();

export function withDefaultUsers() {
    generateDefaultUsers();
    mockUserDB.reset(defaultUsers);
}
