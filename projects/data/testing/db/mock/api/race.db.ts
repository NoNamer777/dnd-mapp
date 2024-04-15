import { createId } from '@paralleldrive/cuid2';
import { CreateRaceData, RaceBuilder, RaceModel, Races } from '../../../../src';

interface RaceDB {
    [raceId: string]: RaceModel;
}

class MockRaceDB {
    private db: RaceDB;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db).sort((current, next) => current.name.localeCompare(next.name));
    }

    findOneById(raceId: string) {
        return Object.values<RaceModel>(this.db).find((race) => race.id === raceId) ?? null;
    }

    findOneByName(raceName: string) {
        return Object.values(this.db).find((race) => race.name === raceName) ?? null;
    }

    create(raceData: CreateRaceData) {
        const newRace = new RaceBuilder().withId(createId()).withName(raceData.name).build();

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

    remove(raceId: string) {
        if (!this.db[raceId]) {
            throw new Error(`Cannot delete Race with ID: '${raceId}' because it does not exist.`);
        }
        delete this.db[raceId];
    }

    reset() {
        defaultRace = new RaceBuilder().withId(createId()).withName(Races.DWARF).build();
        this.db = { [defaultRace.id]: defaultRace };
    }
}

export let defaultRace: RaceModel;

export const mockRaceDB = new MockRaceDB();
