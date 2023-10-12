import { Skill } from './skill.model';

export enum Abilities {
    STRENGTH = 'Strength',
    DEXTERITY = 'Dexterity',
    CONSTITUTION = 'Constitution',
    INTELLIGENCE = 'Intelligence',
    WISDOM = 'Wisdom',
    CHARISMA = 'Charisma',
}

export type AbilityName = (typeof Abilities)[keyof typeof Abilities];

export interface Ability {
    id: number;
    name: AbilityName;
    skills: Skill[];
}

export type CreateAbilityData = Omit<Ability, 'id'>;
