import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Skill } from '@dnd-mapp/data';
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
    name: string;

    @ManyToOne('AbilityEntity', 'skills')
    @JoinColumn({ name: 'ability_id', referencedColumnName: 'id' })
    ability: AbilityEntity;
}
