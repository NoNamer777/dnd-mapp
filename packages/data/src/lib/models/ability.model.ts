import { Skill } from './skill.model';

export interface Ability {
    id: number;
    name: string;
    skills: Skill[];
}

export enum Abilities {
    STRENGTH = 'Strength',
    DEXTERITY = 'Dexterity',
    CONSTITUTION = 'Constitution',
    INTELLIGENCE = 'Intelligence',
    WISDOM = 'Wisdom',
    CHARISMA = 'Charisma',
}

export type CreateAbilityData = Omit<Ability, 'id'>;
