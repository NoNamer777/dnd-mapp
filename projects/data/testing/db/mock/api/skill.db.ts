import { CreateSkillData, SkillModel, SkillName, Skills } from '../../../../src';

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

    findOneByName(name: SkillName) {
        return Object.values(this.db).find((skill) => skill.name === name) ?? null;
    }

    save(skill: SkillModel) {
        return skill.id ? this.update(skill) : this.insert(skill);
    }

    insert(skill: CreateSkillData) {
        const newSkill: SkillModel = {
            id: this.nextId++,
            ...skill,
        };

        this.db[newSkill.id] = newSkill;
        return newSkill;
    }

    update(skill: SkillModel) {
        if (!this.db[skill.id]) {
            throw new Error(`Could not update Skill with ID: '${skill.id}' because it does not exist.`);
        }
        this.db[skill.id] = skill;
        return skill;
    }

    deleteById(id: number) {
        if (!this.db[id]) {
            throw new Error(`Cannot delete Skill with ID: '${id}' because it does not exist.`);
        }
        delete this.db[id];
    }

    reset() {
        defaultSkill = new SkillModel(1, Skills.ACROBATICS);
        this.db = { [defaultSkill.id]: defaultSkill };
        this.nextId = 2;
    }
}

export let defaultSkill: SkillModel;

export const mockSkillDB = new MockSkillDB();
