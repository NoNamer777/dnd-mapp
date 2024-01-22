import { ValidateNested } from 'class-validator';
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
    ability: AbilityModel | null;

    name: SkillName;

    constructor(id?: number, name?: SkillName, ability?: AbilityModel) {
        super(id);

        if (name) this.name = name;
        this.ability = ability ? ability : null;
    }
}

export type CreateSkillData = Omit<SkillModel, 'id'>;
