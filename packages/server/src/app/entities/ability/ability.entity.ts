import { Ability } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { ArrayMinSize, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common';
import { SkillEntity } from '../skill/skill.entity';

@Entity('ability')
export class AbilityEntity extends BaseEntity implements Ability {
    @Column({
        name: 'name',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ValidateNested({ each: true })
    @ArrayMinSize(0)
    skills: SkillEntity[];
}

export class CreateAbilityDto extends OmitType(AbilityEntity, ['id'] as const) {}
