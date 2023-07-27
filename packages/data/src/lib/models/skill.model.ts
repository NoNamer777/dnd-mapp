import { Ability } from './ability.model';

export interface Skill {
    id: number;
    name: string;
    ability: Ability;
}
