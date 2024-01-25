import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { EntityModel } from '../models';
import { SkillModel } from './skill.model';

export enum Abilities {
    STRENGTH = 'Strength',
    DEXTERITY = 'Dexterity',
    CONSTITUTION = 'Constitution',
    INTELLIGENCE = 'Intelligence',
    WISDOM = 'Wisdom',
    CHARISMA = 'Charisma',
}

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

    withId(id: number) {
        this.ability.id = id;

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
