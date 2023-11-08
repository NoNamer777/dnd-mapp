import type { User, UserRoleName } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    Min,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEntity } from '../user-role';

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
    @MinLength(8)
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({
        name: 'email_address',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Exclude({ toPlainOnly: true })
    emailAddress: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @ManyToMany(() => UserRoleEntity)
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: UserRoleEntity[];

    hasRole(role: UserRoleName) {
        return this.roles.map((userRole) => userRole.name).includes(role);
    }
}

export class CreateUserDto extends OmitType(UserEntity, ['id', 'roles', 'hasRole'] as const) {}
