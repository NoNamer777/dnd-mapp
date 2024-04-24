import { CreateRaceData, RaceBuilder, RaceModel, RaceName } from '../../../../src';

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
        return Object.values(this.db).find((race) => race.id === raceId) ?? null;
    }

    findOneByName(raceName: RaceName) {
        return Object.values(this.db).find((race) => race.name === raceName) ?? null;
    }

    create(raceData: CreateRaceData) {
        const newRace = new RaceBuilder().withId().withName(raceData.name).build();

        this.db[newRace.id] = newRace;
        return newRace;
    }

    update(raceData: RaceModel) {
        this.db[raceData.id] = raceData;
        return raceData;
    }

    remove(raceId: string) {
        delete this.db[raceId];
    }

    reset() {
        defaultRace = new RaceBuilder().withId().withName('Dwarf').build();
        this.db = { [defaultRace.id]: defaultRace };
    }
}

export let defaultRace: RaceModel;

export const mockRaceDB = new MockRaceDB();
