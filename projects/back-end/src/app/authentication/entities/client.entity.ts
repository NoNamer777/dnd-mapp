import { ClientModel } from '@dnd-mapp/data';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('client')
export class ClientEntity implements ClientModel {
    @PrimaryColumn({
        name: 'id',
        type: 'varchar',
        width: 32,
        nullable: false,
        unique: true,
    })
    @IsString()
    @IsNotEmpty()
    id: string;
}
