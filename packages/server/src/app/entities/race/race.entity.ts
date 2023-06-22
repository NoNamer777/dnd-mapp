import { Race, RaceTrait } from '@dnd-mapp/data';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common';

@Entity('race')
export class RaceEntity extends BaseEntity implements Race {
    @Column({
        name: 'name',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    name: string;

    traits: RaceTrait[] = [];
}
