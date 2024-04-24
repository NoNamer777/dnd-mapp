import { CreateSkillData, SkillBuilder, SkillModel, SkillName } from '../../../../src';
import { defaultAbility } from './ability.db';

interface SkillDB {
    [id: string]: SkillModel;
}

class MockSkillDB {
    private db: SkillDB;

    constructor() {
        this.reset();
    }

    findAll() {
        return Object.values(this.db).sort((current, next) => current.name.localeCompare(next.name));
    }

    findAllByAbility(abilityId: string) {
        return Object.values(this.db).filter((skill) => skill.ability.id === abilityId);
    }

    findOneById(id: string) {
        return Object.values(this.db).find((skill) => skill.id === id) ?? null;
    }

    findOneByName(name: SkillName) {
        return Object.values(this.db).find((skill) => skill.name === name) ?? null;
    }

    update(skill: SkillModel) {
        this.db[skill.id] = skill;
        return skill;
    }

    create(skill: CreateSkillData) {
        const newSkill = new SkillBuilder().withId().withName(skill.name).fallsUnder(skill.ability).build();

        this.db[newSkill.id] = newSkill;
        return newSkill;
    }

    remove(id: string) {
        delete this.db[id];
    }

    reset() {
        defaultSkill = new SkillBuilder().withId().withName('Acrobatics').fallsUnder(defaultAbility).build();
        this.db = { [defaultSkill.id]: defaultSkill };
    }
}

export let defaultSkill: SkillModel;

export const mockSkillDB = new MockSkillDB();
