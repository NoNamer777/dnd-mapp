import { BaseEntityModel } from '@dnd-mapp/data';
import { IsInt, Min } from 'class-validator';
import { PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity implements BaseEntityModel {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn()
    @IsInt()
    @Min(1)
    id: number;
}
