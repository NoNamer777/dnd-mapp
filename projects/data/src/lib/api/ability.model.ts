import { createId } from '@paralleldrive/cuid2';
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { EntityModel } from '../models';
import { SkillModel } from './skill.model';

export const Abilities = {
    STRENGTH: 'Strength',
    DEXTERITY: 'Dexterity',
    CONSTITUTION: 'Constitution',
    INTELLIGENCE: 'Intelligence',
    WISDOM: 'Wisdom',
    CHARISMA: 'Charisma',
} as const;

export type AbilityName = (typeof Abilities)[keyof typeof Abilities];

export class AbilityModel extends EntityModel {
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    skills: SkillModel[];

    @IsString()
    @IsNotEmpty()
    @IsEnum(Abilities)
    name: AbilityName;
}

export type CreateAbilityData = Omit<AbilityModel, 'id'>;

export class AbilityBuilder {
    private readonly ability = new AbilityModel();

    constructor() {
        this.ability.skills = [];
    }

    build() {
        return this.ability;
    }

    withId(id?: string) {
        this.ability.id = id ?? createId();
        return this;
    }

    withName(name: AbilityName) {
        this.ability.name = name;
        return this;
    }

    withSkills(skills: SkillModel[]) {
        this.ability.skills = skills;
        return this;
    }
}
