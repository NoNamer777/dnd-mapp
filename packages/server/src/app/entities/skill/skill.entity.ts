import { Skill } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common';
import { AbilityEntity } from '../ability';

@Entity('skill')
export class SkillEntity extends BaseEntity implements Skill {
    @Column({
        name: 'name',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ManyToOne('AbilityEntity', 'skills')
    @JoinColumn({ name: 'ability_id', referencedColumnName: 'id' })
    @ValidateNested()
    ability: AbilityEntity;
}

export class CreateSkillDto extends OmitType(SkillEntity, ['id'] as const) {}
