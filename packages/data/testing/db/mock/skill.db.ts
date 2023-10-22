import { CreateSkillData, Skill } from '../../../src/lib/models/skill.model';
import { defaultAbility } from './ability.db';

interface SkillDB {
    [id: string]: Skill;
}

class MockSkillDB {
    private db: SkillDB;
    private nextId: number;

    constructor() {
        this.reset();
    }

    find(): Skill[] {
        return Object.values(this.db);
    }

    findOneBy(params: { id?: number; name?: string }): Skill | null {
        if (params.id) {
            return Object.values<Skill>(this.db).find((skill) => skill.id === params.id) ?? null;
        }
        if (params.name) {
            return Object.values<Skill>(this.db).find((skill) => skill.name === params.name) ?? null;
        }
        return null;
    }

    save(skillData: Skill): Skill {
        return skillData.id ? this.update({ id: skillData.id }, skillData) : this.insert(skillData);
    }

    update(params: { id: number }, skillData: Skill): Skill {
        if (!this.db[params.id]) {
            throw new Error(`Could not update Skill with ID: '${params.id}' because it does not exist.`);
        }
        this.db[params.id] = skillData;
        return skillData;
    }

    insert(skillData: CreateSkillData): Skill {
        const newSkill: Skill = {
            id: this.nextId++,
            ...skillData,
        };

        this.db[newSkill.id] = newSkill;
        return newSkill;
    }

    delete(params: { id: number }): void {
        if (!this.db[params.id]) {
            throw new Error(`Cannot delete Skill with ID: '${params.id}' because it does not exist.`);
        }
        delete this.db[params.id];
    }

    reset(): void {
        this.db = { [defaultSkill.id]: defaultSkill };
        this.nextId = Object.values(this.db).length + 1;
    }
}

export const defaultSkill: Skill = {
    id: 1,
    name: 'Test Skill',
    ability: defaultAbility,
};

export const mockSkillDB = new MockSkillDB();
