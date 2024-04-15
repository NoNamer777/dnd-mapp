import { createId } from '@paralleldrive/cuid2';
import { CreateSkillData, SkillBuilder, SkillModel, SkillName, Skills } from '../../../../src';
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
        return Object.values(this.db).filter((skill) => skill.ability?.id === abilityId);
    }

    findOneById(id: string) {
        return Object.values(this.db).find((skill) => skill.id === id) ?? null;
    }

    findOneByName(name: SkillName) {
        return Object.values(this.db).find((skill) => skill.name === name) ?? null;
    }

    update(skill: SkillModel) {
        if (!this.db[skill.id]) {
            throw new Error(`Could not update Skill with ID: '${skill.id}' because it does not exist.`);
        }
        this.db[skill.id] = skill;
        return skill;
    }

    create(skill: CreateSkillData) {
        const newSkill = new SkillBuilder().withId(createId()).withName(skill.name).fallsUnder(skill.ability).build();

        this.db[newSkill.id] = newSkill;
        return newSkill;
    }

    remove(id: string) {
        if (!this.db[id]) {
            throw new Error(`Cannot delete Skill with ID: '${id}' because it does not exist.`);
        }
        delete this.db[id];
    }

    reset() {
        defaultSkill = new SkillBuilder()
            .withId(createId())
            .withName(Skills.ACROBATICS)
            .fallsUnder(defaultAbility)
            .build();
        this.db = { [defaultSkill.id]: defaultSkill };
    }
}

export let defaultSkill: SkillModel;

export const mockSkillDB = new MockSkillDB();
