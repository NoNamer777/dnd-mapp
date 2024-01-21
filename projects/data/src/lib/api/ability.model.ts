import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { NameableModel } from '../models';
import { SkillModel } from './skill.model';

export class AbilityModel extends NameableModel {
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    skills: SkillModel[];
}

export type CreateAbilityData = Omit<AbilityModel, 'id'>;
