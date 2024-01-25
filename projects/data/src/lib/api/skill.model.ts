import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { EntityModel } from '../models';
import { AbilityModel } from './ability.model';

export enum Skills {
    ATHLETICS = 'Athletics',
    ACROBATICS = 'Acrobatics',
    SLEIGHT_OF_HAND = 'Sleight of Hand',
    STEALTH = 'Stealth',
    ARCANA = 'Arcana',
    HISTORY = 'History',
    INVESTIGATION = 'Investigation',
    NATURE = 'Nature',
    RELIGION = 'Religion',
    ANIMAL_HANDLING = 'Animal Handling',
    INSIGHT = 'Insight',
    MEDICINE = 'Medicine',
    PERCEPTION = 'Perception',
    SURVIVAL = 'Survival',
    DECEPTION = 'Deception',
    INTIMIDATION = 'Intimidation',
    PERFORMANCE = 'Performance',
    PERSUASION = 'Persuasion',
}

export type SkillName = (typeof Skills)[keyof typeof Skills];

export class SkillModel extends EntityModel {
    @ValidateNested()
    ability: AbilityModel;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Skills)
    name: SkillName;
}

export type CreateSkillData = Omit<SkillModel, 'id'>;

export class SkillBuilder {
    private readonly skill = new SkillModel();

    build() {
        return this.skill;
    }

    fallsUnder(ability: AbilityModel) {
        this.skill.ability = ability;

        return this;
    }

    withId(id: number) {
        this.skill.id = id;

        return this;
    }

    withName(name: SkillName) {
        this.skill.name = name;

        return this;
    }
}
