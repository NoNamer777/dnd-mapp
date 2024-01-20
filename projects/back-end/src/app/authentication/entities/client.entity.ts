import { ClientModel } from '@dnd-mapp/data';
import { Exclude } from 'class-transformer';
import { IsBase64, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { nanoid } from 'nanoid';
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
    @IsString()
    @IsNotEmpty()
    id: string;

    @Column({
        name: 'code_challenge',
        type: 'varchar',
        width: 255,
        nullable: true,
        unique: true,
    })
    @Exclude()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsBase64()
    codeChallenge: string;

    @Column({
        name: 'authorization_code',
        type: 'varchar',
        width: 255,
        nullable: true,
        unique: true,
    })
    @Exclude()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    authorizationCode: string;

    @Column({
        name: 'authorization_code_generated_at',
        type: 'datetime',
        nullable: true,
    })
    @Exclude()
    @IsOptional()
    @IsDate()
    codeGeneratedAt: Date;

    constructor() {
        this.id = nanoid(32);
    }
}
