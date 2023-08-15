import { Ability } from '@dnd-mapp/data';
import { Column, Entity, OneToMany } from 'typeorm';
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
    name: string;

    @OneToMany('SkillEntity', 'ability')
    skills: SkillEntity[];
}
