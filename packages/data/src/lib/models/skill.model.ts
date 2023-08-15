import { Ability } from './ability.model';

export interface Skill {
    id: number;
    name: string;
    ability: Ability;
}

export type CreateSkillData = Omit<Skill, 'id'>;
