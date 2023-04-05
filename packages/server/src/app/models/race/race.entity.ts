import { Race } from '@dnd-mapp/data';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('race')
export class RaceEntity implements Race {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    name: string;
}
