import { UserRole, UserRoleName, UserRoles } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class RoleEntity implements UserRole {
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
    @IsEnum(UserRoles)
    name: UserRoleName;
}

export class CreateRoleDto extends OmitType(RoleEntity, ['id'] as const) {}
