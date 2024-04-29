import { createId } from '@paralleldrive/cuid2';
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
        data.id = createId();

        this.db[data.id] = data;
        return data;
    }

    remove(id: string) {
        delete this.db[id];
    }

    update(session: SessionModel) {
        this.db[session.id] = session;
        return session;
    }

    reset() {
        this.db = {};
    }
}

export const mockSessionDB = new MockSessionDB();
