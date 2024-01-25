import { ClientBuilder, ClientModel } from '../../../../src';

interface ClientDB {
    [id: string]: ClientModel;
}

class MockClientDB {
    private db: ClientDB;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db);
    }

    findOneById(id: string) {
        return Object.values(this.db).find((client) => client.id === id) ?? null;
    }

    save(data: ClientModel) {
        this.db[data.id] = data;

        return data;
    }

    deleteById(id: string) {
        if (!this.db[id]) {
            throw new Error(`Cannot remove Client with ID: '${id}' because it does not exist.`);
        }
        delete this.db[id];
    }

    reset() {
        defaultClient = new ClientBuilder().withId('9mez32qmVA9Tl1QBuwAgqZSRf69i3x3B').build();
        this.db = { [defaultClient.id]: defaultClient };
    }
}

export let defaultClient: ClientModel;

export const mockClientDB = new MockClientDB();
