import { BaseEntityModel } from '@dnd-mapp/data';
import { PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity implements BaseEntityModel {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn()
    id: number;
}
