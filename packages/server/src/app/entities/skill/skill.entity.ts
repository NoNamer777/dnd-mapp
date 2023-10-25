import { Skill } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AbilityEntity } from '../ability';

@Entity('skill')
export class SkillEntity implements Skill {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn()
    @IsInt()
    @Min(1)
    id: number;

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
