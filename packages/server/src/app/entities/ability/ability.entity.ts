import { Ability } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { ArrayMinSize, ValidateNested } from 'class-validator';
import { Entity } from 'typeorm';
import { NameableEntity } from '../models';
import { SkillEntity } from '../skill/skill.entity';

@Entity('ability')
export class AbilityEntity extends NameableEntity implements Ability {
    @ValidateNested({ each: true })
    @ArrayMinSize(0)
    skills: SkillEntity[];
}

export class CreateAbilityDto extends OmitType(AbilityEntity, ['id', 'skills'] as const) {}
