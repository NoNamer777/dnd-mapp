import { Skill } from './skill.model';

export interface Ability {
    id: number;
    name: string;
    skills: Skill[];
}

export type CreateAbilityData = Omit<Ability, 'id'>;
