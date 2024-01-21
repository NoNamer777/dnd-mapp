import { ValidateNested } from 'class-validator';
import { NameableModel } from '../models';
import { AbilityModel } from './ability.model';

export class SkillModel extends NameableModel {
    @ValidateNested()
    ability: AbilityModel;
}

export type CreateSkillData = Omit<SkillModel, 'id'>;
