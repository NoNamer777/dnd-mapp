import { User } from '@dnd-mapp/data';
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

export const defaultUsers: User[] = [
    {
        id: 'mUaZQqsMMrOkP-wlbAiUR',
        username: 'Player 1',
        email: 'player_1@dndmapp.nl.eu.org',
        password: 'secure_password',
        roles: ['Player'],
    },
    {
        id: '6C1brq3WrmiXxemlcYoj_',
        username: 'Player 2',
        email: 'player_2@dndmapp.nl.eu.org',
        password: 'secure_password',
        roles: ['Player', 'Dungeon Master'],
    },
    {
        id: 'f0k8GlWm5DkePutrnwnjr',
        username: 'Admin',
        email: 'admin@dndmapp.nl.eu.org',
        password: 'secure_password',
        roles: ['Administrator'],
    },
];

export function withDefaultUsers() {
    mockUserDB.reset(defaultUsers);
}
