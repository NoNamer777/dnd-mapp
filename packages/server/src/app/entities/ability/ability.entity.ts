import { Ability } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { ArrayMinSize, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { SkillEntity } from '../skill/skill.entity';

@Entity('ability')
export class AbilityEntity implements Ability {
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

    @ValidateNested({ each: true })
    @ArrayMinSize(0)
    skills: SkillEntity[];
}

export class CreateAbilityDto extends OmitType(AbilityEntity, ['id'] as const) {}
