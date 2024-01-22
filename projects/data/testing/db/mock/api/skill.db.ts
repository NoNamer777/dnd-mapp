import { CreateSkillData, SkillModel } from '../../../../src';

interface SkillDB {
    [id: string]: SkillModel;
}

class MockSkillDB {
    private db: SkillDB;
    private nextId: number;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db);
    }

    findAllByAbility(abilityId: number) {
        return Object.values(this.db).filter((skill) => skill.ability?.id === abilityId);
    }

    findOneById(id: number) {
        return Object.values(this.db).find((skill) => skill.id === id) ?? null;
    }

    findOneByName(abilityName: string) {
        return Object.values(this.db).find((skill) => skill.name === abilityName) ?? null;
    }

    save(skillData: SkillModel) {
        return skillData.id ? this.update(skillData) : this.insert(skillData);
    }

    insert(skillData: CreateSkillData) {
        const newSkill: SkillModel = {
            id: this.nextId++,
            ...skillData,
        };

        this.db[newSkill.id] = newSkill;
        return newSkill;
    }

    update(skillData: SkillModel) {
        if (!this.db[skillData.id]) {
            throw new Error(`Could not update Skill with ID: '${skillData.id}' because it does not exist.`);
        }
        this.db[skillData.id] = skillData;
        return skillData;
    }

    deleteById(skillId: number) {
        if (!this.db[skillId]) {
            throw new Error(`Cannot delete Skill with ID: '${skillId}' because it does not exist.`);
        }
        delete this.db[skillId];
    }

    reset() {
        defaultSkill = new SkillModel(1, 'Test Skill');
        this.db = { [defaultSkill.id]: defaultSkill };
        this.nextId = 2;
    }
}

export let defaultSkill: SkillModel;

export const mockSkillDB = new MockSkillDB();
