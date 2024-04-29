import { createId } from '@paralleldrive/cuid2';
import { Session } from '../../../../src';

interface SessionDB<T extends Session> {
    [id: string]: T;
}

class MockSessionDB<T extends Session> {
    private db: SessionDB<T>;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db);
    }

    findOneById(id: string) {
        return Object.values(this.db).find((session) => session.id === id) ?? null;
    }

    create(data: T) {
        data.id = createId();

        this.db[data.id] = data;
        return data;
    }

    remove(id: string) {
        delete this.db[id];
    }

    update(session: T) {
        this.db[session.id] = session;
        return session;
    }

    reset() {
        this.db = {};
    }
}

export const mockSessionDB = new MockSessionDB();
