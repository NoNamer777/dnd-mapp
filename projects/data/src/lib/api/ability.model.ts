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

    constructor(id?: number, name?: AbilityName, skills?: SkillModel[]) {
        super(id);

        if (name) this.name = name;

        this.skills = skills ? skills : [];
    }
}

export type CreateAbilityData = Omit<AbilityModel, 'id'>;
