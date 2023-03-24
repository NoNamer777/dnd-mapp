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

    findAll(): Race[] {
        return Object.values(this.db);
    }

    findById(raceId: number): Race | null {
        return Object.values<Race>(this.db).find((race) => race.id === raceId) ?? null;
    }

    findByName(raceName: string): Race | null {
        return Object.values<Race>(this.db).find((race) => race.name === raceName) ?? null;
    }

    update(raceData: Race): Race {
        if (!this.db[raceData.id]) {
            throw new Error(`Could not update Race with ID: '${raceData.id}' because it does not exist.`);
        }
        this.db[raceData.id] = raceData;
        return raceData;
    }

    create(raceData: CreateRaceData): Race {
        const newRace: Race = {
            id: this.nextId++,
            ...raceData,
        };

        this.db[newRace.id] = newRace;
        return newRace;
    }

    deleteById(raceId: number): void {
        if (!this.db[raceId]) {
            throw new Error(`Cannot delete Race with ID: '${raceId}' because it does not exist.`);
        }
        delete this.db[raceId];
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
