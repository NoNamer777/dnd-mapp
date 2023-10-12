import { Ability } from './ability.model';
import { BaseEntityModel } from './entity.model';

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

export interface Skill extends BaseEntityModel {
    name: SkillName;
    ability: Ability;
}

export type CreateSkillData = Omit<Skill, 'id'>;
