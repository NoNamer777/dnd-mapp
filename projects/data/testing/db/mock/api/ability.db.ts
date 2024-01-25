import { plainToInstance } from 'class-transformer';
import { Abilities, AbilityBuilder, AbilityModel, AbilityName, CreateAbilityData } from '../../../../src';

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
        return plainToInstance(AbilityModel, Object.values(this.db));
    }

    findOneById(id: number) {
        return plainToInstance(AbilityModel, Object.values(this.db).find((ability) => ability.id === id) ?? null);
    }

    findOneByName(name: AbilityName) {
        return plainToInstance(AbilityModel, Object.values(this.db).find((ability) => ability.name === name) ?? null);
    }

    save(ability: AbilityModel) {
        return ability.id ? this.update(ability) : this.insert(ability);
    }

    insert(ability: CreateAbilityData) {
        const newAbility = new AbilityBuilder().withId(this.nextId++).withName(ability.name).build();

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
        defaultAbility = new AbilityBuilder().withId(1).withName(Abilities.DEXTERITY).build();
        this.db = { [defaultAbility.id]: defaultAbility };
        this.nextId = 2;
    }
}

export let defaultAbility: AbilityModel;

export const mockAbilityDB = new MockAbilityDB();
