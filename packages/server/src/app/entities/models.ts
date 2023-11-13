import { CreateNameableEntityData, EntityModel, NameableEntityModel } from '@dnd-mapp/data';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export interface EntityApiService<T extends NameableEntity, C = CreateNameableEntityData> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    findByName(name: string): Promise<T | null>;
    update(entity: T): Promise<T>;
    create(entity: C): Promise<T>;
    remove(id: number): Promise<void>;
}

export abstract class EntityClazz implements EntityModel {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn()
    @IsInt()
    @Min(1)
    id: number;
}

export abstract class NameableEntity extends EntityClazz implements NameableEntityModel {
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
