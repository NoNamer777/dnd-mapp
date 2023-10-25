import { Race } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
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
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class CreateRaceDto extends OmitType(RaceEntity, ['id'] as const) {}
