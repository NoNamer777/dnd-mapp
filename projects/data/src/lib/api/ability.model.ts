import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { NameableModel } from '../models';
import { SkillModel } from './skill.model';

export class AbilityModel extends NameableModel {
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    skills: SkillModel[];

    constructor(id?: number, name?: string, skills?: SkillModel[]) {
        super(id, name);

        this.skills = skills ? skills : [];
    }
}

export type CreateAbilityData = Omit<AbilityModel, 'id'>;
