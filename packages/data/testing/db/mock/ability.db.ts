import { Ability, CreateAbilityData } from '@dnd-mapp/data';

interface AbilityDB {
    [id: string]: Ability;
}

class MockAbilityDB {
    private db: AbilityDB;
    private nextId: number;

    constructor() {
        this.reset();
    }

    find(): Ability[] {
        return Object.values(this.db);
    }

    findOneBy(params: { id?: number; name?: string }): Ability | null {
        if (params.id) {
            return Object.values<Ability>(this.db).find((ability) => ability.id === params.id) ?? null;
        }
        if (params.name) {
            return Object.values<Ability>(this.db).find((ability) => ability.name === params.name) ?? null;
        }
        return null;
    }

    save(abilityData: Ability): Ability {
        return abilityData.id ? this.update({ id: abilityData.id }, abilityData) : this.insert(abilityData);
    }

    update(params: { id: number }, abilityData: Ability): Ability {
        if (!this.db[params.id]) {
            throw new Error(`Could not update Ability with ID: '${params.id}' because it does not exist.`);
        }
        this.db[params.id] = abilityData;
        return abilityData;
    }

    insert(abilityData: CreateAbilityData): Ability {
        const newAbility: Ability = {
            id: this.nextId++,
            ...abilityData,
        };

        this.db[newAbility.id] = newAbility;
        return newAbility;
    }

    delete(params: { id: number }): void {
        if (!this.db[params.id]) {
            throw new Error(`Cannot delete Ability with ID: '${params.id}' because it does not exist.`);
        }
        delete this.db[params.id];
    }

    reset(): void {
        this.db = { [defaultAbility.id]: defaultAbility };
        this.nextId = Object.values(this.db).length + 1;
    }
}

export const defaultAbility: Ability = {
    id: 1,
    name: 'Test Ability',
    skills: [],
};

export const mockAbilityDB = new MockAbilityDB();
