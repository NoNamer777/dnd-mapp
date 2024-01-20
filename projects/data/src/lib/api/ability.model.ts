import { NameableEntityModel } from '../models';
import { Skill } from './skill.model';

export class Ability extends NameableEntityModel {
    skills: Skill[];
}

export type CreateAbilityData = Omit<Ability, 'id'>;
