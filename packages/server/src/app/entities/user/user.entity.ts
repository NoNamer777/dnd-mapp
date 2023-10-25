import { User } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsInt, IsNotEmpty, IsString, IsStrongPassword, Min } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity implements User {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn()
    @IsInt()
    @Min(1)
    id: number;

    @Column({
        name: 'username',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @Column({
        name: 'password',
        type: 'varchar',
        nullable: false,
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @Column({
        name: 'emailAddress',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;
}

export class CreateUserDto extends OmitType(UserEntity, ['id'] as const) {}
