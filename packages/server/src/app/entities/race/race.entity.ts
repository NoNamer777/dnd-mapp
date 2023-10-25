import { Race } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('race')
export class RaceEntity implements Race {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn()
    @IsInt()
    @Min(1)
    id: number;

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
