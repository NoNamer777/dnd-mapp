import { AbilityModel, CreateAbilityData } from '../../../../src';
import { defaultSkill } from './skill.db';

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

    findOneById(abilityId: number) {
        return Object.values(this.db).find((ability) => ability.id === abilityId) ?? null;
    }

    findOneByName(abilityName: string) {
        return Object.values(this.db).find((ability) => ability.name === abilityName) ?? null;
    }

    save(abilityData: AbilityModel) {
        return abilityData.id ? this.update(abilityData) : this.insert(abilityData);
    }

    insert(abilityData: CreateAbilityData) {
        const newAbility: AbilityModel = {
            id: this.nextId++,
            ...abilityData,
        };

        this.db[newAbility.id] = newAbility;
        return newAbility;
    }

    update(abilityData: AbilityModel) {
        if (!this.db[abilityData.id]) {
            throw new Error(`Could not update Ability with ID: '${abilityData.id}' because it does not exist.`);
        }
        this.db[abilityData.id] = abilityData;
        return abilityData;
    }

    deleteById(abilityId: number) {
        if (!this.db[abilityId]) {
            throw new Error(`Cannot delete Ability with ID: '${abilityId}' because it does not exist.`);
        }
        delete this.db[abilityId];
    }

    reset() {
        defaultAbility = new AbilityModel(1, 'Test Ability', [defaultSkill]);
        this.db = { [defaultAbility.id]: defaultAbility };
        this.nextId = 2;
    }
}

export let defaultAbility: AbilityModel;

export const mockAbilityDB = new MockAbilityDB();
