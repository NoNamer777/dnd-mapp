import { NameableEntityModel } from '../models';
import { Skill } from './skill.model';

export interface Ability extends NameableEntityModel {
    skills: Skill[];
}

export type CreateAbilityData = Omit<Ability, 'id'>;
