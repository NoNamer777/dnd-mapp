import { ValidateNested } from 'class-validator';
import { NameableModel } from '../models';
import { AbilityModel } from './ability.model';

export class SkillModel extends NameableModel {
    @ValidateNested()
    ability: AbilityModel | null;

    constructor(id?: number, name?: string, ability?: AbilityModel) {
        super(id, name);
        this.ability = ability ? ability : null;
    }
}

export type CreateSkillData = Omit<SkillModel, 'id'>;
