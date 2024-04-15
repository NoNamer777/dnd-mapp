import { SessionBuilder, SessionModel } from '../../../../src';

interface SessionDB {
    [id: string]: SessionModel;
}

class MockSessionDB {
    private db: SessionDB;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db);
    }

    findOneById(id: string) {
        return Object.values(this.db).find((session) => session.id === id) ?? null;
    }

    create(data: SessionModel) {
        this.db[data.id] = data;

        return data;
    }

    remove(id: string) {
        if (!this.db[id]) {
            throw new Error(`Cannot remove Session: '${id}' because it does not exist.`);
        }
        delete this.db[id];
    }

    reset() {
        defaultSession = new SessionBuilder().withId('9mez32qmVA9Tl1QBuwAgqZSRf69i3x3B').build();
        this.db = { [defaultSession.id]: defaultSession };
    }
}

export let defaultSession: SessionModel;

export const mockSessionDB = new MockSessionDB();
