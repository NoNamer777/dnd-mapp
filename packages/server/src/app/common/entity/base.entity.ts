import { BaseEntityModel } from '@dnd-mapp/data';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity implements BaseEntityModel {
    @PrimaryGeneratedColumn('increment')
    id: number;
}
