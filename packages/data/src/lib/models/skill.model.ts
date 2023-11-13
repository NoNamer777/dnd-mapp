import { Ability } from './ability.model';
import { NameableEntityModel } from './entity.model';

export interface Skill extends NameableEntityModel {
    ability: Ability;
}

export type CreateSkillData = Omit<Skill, 'id'>;
