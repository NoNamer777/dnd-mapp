import { AbilityBuilder, AbilityModel, AbilityName, CreateAbilityData } from '../../../../src';

interface AbilityDB {
    [id: string]: AbilityModel;
}

class MockAbilityDB {
    private db: AbilityDB;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db).sort((curr, next) => curr.name.localeCompare(next.name));
    }

    findOneById(id: string) {
        return Object.values(this.db).find((ability) => ability.id === id) ?? null;
    }

    findOneByName(name: AbilityName) {
        return Object.values(this.db).find((ability) => ability.name === name) ?? null;
    }

    update(ability: AbilityModel) {
        this.db[ability.id] = ability;
        return ability;
    }

    create(ability: CreateAbilityData) {
        const newAbility = new AbilityBuilder().withId().withName(ability.name).build();

        this.db[newAbility.id] = newAbility;
        return newAbility;
    }

    remove(id: number) {
        delete this.db[id];
    }

    reset() {
        defaultAbility = new AbilityBuilder().withId().withName('Dexterity').build();
        this.db = { [defaultAbility.id]: defaultAbility };
    }
}

export let defaultAbility: AbilityModel;

export const mockAbilityDB = new MockAbilityDB();
