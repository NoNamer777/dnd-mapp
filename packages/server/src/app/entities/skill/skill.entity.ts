import { Skill } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { ValidateNested } from 'class-validator';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbilityEntity } from '../ability';
import { NameableEntity } from '../models';

@Entity('skill')
export class SkillEntity extends NameableEntity implements Skill {
    @ManyToOne('AbilityEntity', 'skills')
    @JoinColumn({ name: 'ability_id', referencedColumnName: 'id' })
    @ValidateNested()
    ability: AbilityEntity;
}

export class CreateSkillDto extends OmitType(SkillEntity, ['id'] as const) {}
