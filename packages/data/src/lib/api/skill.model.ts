import { NameableEntityModel } from '../models';
import { Ability } from './ability.model';

export interface Skill extends NameableEntityModel {
    ability: Ability;
}

export type CreateSkillData = Omit<Skill, 'id'>;
