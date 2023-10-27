import { CreateRaceData, Race } from '../../../src';

interface RaceDB {
    [raceId: string]: Race;
}

class MockRaceDB {
    private db: RaceDB;
    private nextId: number;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db).sort((r1, r2) => r1.id - r2.id);
    }

    findOneById(raceId: number) {
        return Object.values<Race>(this.db).find((race) => race.id === raceId) ?? null;
    }

    findOneByName(raceName: string) {
        return Object.values(this.db).find((race) => race.name === raceName) ?? null;
    }

    save(raceData: Race) {
        return raceData.id ? this.update(raceData) : this.insert(raceData);
    }

    insert(raceData: CreateRaceData) {
        const newRace: Race = {
            id: this.nextId++,
            ...raceData,
        };

        this.db[newRace.id] = newRace;
        return newRace;
    }

    update(raceData: Race) {
        if (!this.db[raceData.id]) {
            throw new Error(`Could not update Race with ID: '${raceData.id}' because it does not exist.`);
        }
        this.db[raceData.id] = raceData;
        return raceData;
    }

    deleteById(raceId: number) {
        if (!this.db[raceId]) {
            throw new Error(`Cannot delete Race with ID: '${raceId}' because it does not exist.`);
        }
        delete this.db[raceId];
    }

    reset() {
        this.db = { [defaultRace.id]: defaultRace };
        this.nextId = Object.values(this.db).length + 1;
    }
}

export const defaultRace: Race = {
    id: 1,
    name: 'Test Race',
};

export const mockRaceDB = new MockRaceDB();
