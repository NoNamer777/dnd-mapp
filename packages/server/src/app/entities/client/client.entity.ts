import { ClientModel } from '@dnd-mapp/data';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('client')
export class ClientEntity implements ClientModel {
    @PrimaryColumn({
        name: 'id',
        type: 'varchar',
        width: 32,
        nullable: false,
        unique: true,
    })
    id: string;

    @Column({
        name: 'secret',
        type: 'varchar',
        width: 64,
        nullable: true,
        default: null,
        unique: true,
    })
    secret: string;
}
