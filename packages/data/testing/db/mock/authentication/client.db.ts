import { ClientModel } from '../../../../src';

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
        this.db[data.id] = { ...data };

        return data;
    }

    deleteById(id: string) {
        if (!this.db[id]) {
            throw new Error(`Cannot remove Client with ID: '${id}' because it does not exist.`);
        }
        delete this.db[id];
    }

    reset() {
        this.db = { [defaultClient.id]: defaultClient };
    }
}

// Unhashed client secret: TPh2MKReLtKndS_GVo5c8Y59jq-aHNev5AhcHMmcbvuXAiiy4Q8K5AaBgshBO2bg

export const defaultClient: ClientModel = {
    id: '9mez32qmVA9Tl1QBuwAgqZSRf69i3x3B',
    secret: '$2a$12$L5zVXPPXErjYnMSJEIYsb.1RPOrdcR/VnXpBnEVY.olKMHir.L3pe',
};

export const mockClientDB = new MockClientDB();
