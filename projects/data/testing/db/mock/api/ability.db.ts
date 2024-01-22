import { Abilities, AbilityModel, AbilityName, CreateAbilityData } from '../../../../src';

interface AbilityDB {
    [id: string]: AbilityModel;
}

class MockAbilityDB {
    private db: AbilityDB;
    private nextId: number;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db);
    }

    findOneById(id: number) {
        return Object.values(this.db).find((ability) => ability.id === id) ?? null;
    }

    findOneByName(name: AbilityName) {
        return Object.values(this.db).find((ability) => ability.name === name) ?? null;
    }

    save(ability: AbilityModel) {
        return ability.id ? this.update(ability) : this.insert(ability);
    }

    insert(ability: CreateAbilityData) {
        const newAbility: AbilityModel = {
            id: this.nextId++,
            ...ability,
        };

        this.db[newAbility.id] = newAbility;
        return newAbility;
    }

    update(ability: AbilityModel) {
        if (!this.db[ability.id]) {
            throw new Error(`Could not update Ability with ID: '${ability.id}' because it does not exist.`);
        }
        this.db[ability.id] = ability;
        return ability;
    }

    deleteById(id: number) {
        if (!this.db[id]) {
            throw new Error(`Cannot delete Ability with ID: '${id}' because it does not exist.`);
        }
        delete this.db[id];
    }

    reset() {
        defaultAbility = new AbilityModel(1, Abilities.STRENGTH, []);
        this.db = { [defaultAbility.id]: defaultAbility };
        this.nextId = 2;
    }
}

export let defaultAbility: AbilityModel;

export const mockAbilityDB = new MockAbilityDB();
