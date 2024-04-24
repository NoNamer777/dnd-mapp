import { SessionModel } from '../../../../src';

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
        delete this.db[id];
    }

    reset() {
        this.db = {};
    }
}

export const mockSessionDB = new MockSessionDB();
