import { CreateRaceData, Race } from '@dnd-mapp/data';

interface RaceDb {
    [raceId: string]: Race;
}

class MockRaceDb {
    private db: RaceDb;
    private nextId: number;

    constructor() {
        this.reset();
    }

    find(): Race[] {
        return Object.values(this.db);
    }

    findOneBy(params: { id?: number; name?: string }): Race | null {
        if (params.id) {
            return Object.values<Race>(this.db).find((race) => race.id === params.id) ?? null;
        }
        if (params.name) {
            return Object.values<Race>(this.db).find((race) => race.name === params.name) ?? null;
        }
        return null;
    }

    save(raceData: Race): Race {
        return raceData.id ? this.update({ id: raceData.id }, raceData) : this.insert(raceData);
    }

    update(params: { id: number }, raceData: Race): Race {
        if (!this.db[params.id]) {
            throw new Error(`Could not update Race with ID: '${params.id}' because it does not exist.`);
        }
        this.db[params.id] = raceData;
        return raceData;
    }

    insert(raceData: CreateRaceData): Race {
        const newRace: Race = {
            id: this.nextId++,
            ...raceData,
        };

        this.db[newRace.id] = newRace;
        return newRace;
    }

    delete(params: { id: number }): void {
        if (!this.db[params.id]) {
            throw new Error(`Cannot delete Race with ID: '${params.id}' because it does not exist.`);
        }
        delete this.db[params.id];
    }

    reset(): void {
        this.db = { [defaultRace.id]: defaultRace };
        this.nextId = Object.values(this.db).length + 1;
    }
}

export const defaultRace: Race = {
    id: 1,
    name: 'Test Race',
};

export const mockRaceDb = new MockRaceDb();
