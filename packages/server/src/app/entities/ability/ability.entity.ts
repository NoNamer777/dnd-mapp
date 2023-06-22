import { Ability } from '@dnd-mapp/data';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common';

@Entity('ability')
export class AbilityEntity extends BaseEntity implements Ability {
    @Column({
        name: 'name',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    name: string;
}
