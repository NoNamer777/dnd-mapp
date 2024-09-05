import { CreateRaceData, RaceBuilder, RaceModel, Races } from '../../../../src';

interface RaceDB {
    [raceId: string]: RaceModel;
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
        return Object.values<RaceModel>(this.db).find((race) => race.id === raceId) ?? null;
    }

    findOneByName(raceName: string) {
        return Object.values(this.db).find((race) => race.name === raceName) ?? null;
    }

    save(raceData: RaceModel) {
        return raceData.id ? this.update(raceData) : this.insert(raceData);
    }

    insert(raceData: CreateRaceData) {
        const newRace = new RaceBuilder().withId(this.nextId++).withName(raceData.name).build();

        this.db[newRace.id] = newRace;
        return newRace;
    }

    update(raceData: RaceModel) {
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
        defaultRace = new RaceBuilder().withId(1).withName(Races.DWARF).build();
        this.db = { [defaultRace.id]: defaultRace };
        this.nextId = 2;
    }
}

export let defaultRace: RaceModel;

export const mockRaceDB = new MockRaceDB();
