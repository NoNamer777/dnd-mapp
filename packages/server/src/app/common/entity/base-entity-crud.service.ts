import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Injectable, NotFoundException } from '@nestjs/common';


export abstract class BaseEntityCrudService<T extends BaseEntity = BaseEntity> {
    protected constructor(private repository: Repository<T>, private entityName: string) {}

    abstract checkUniqueAttributes(entity: T): Promise<void>;

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: number, throwsError = true): Promise<T> {
        const byId = await this.repository.findOneBy({ id: id } as FindOptionsWhere<T>);

        if (!byId && throwsError) {
            throw new NotFoundException(`${this.entityName} with ID: '${id}' is not found.`);
        }
        return byId;
    }

    async update(entity: T): Promise<T> {
        const byId = await this.findById(entity.id, false);

        if (!byId) {
            throw new NotFoundException(
                `Cannot update ${this.entityName} with ID: '${entity.id}' because it does not exist.`
            );
        }
        return await this.updateOrSave(entity);
    }

    async create(entity: Omit<T, 'id'>): Promise<T> {
        return await this.updateOrSave(entity);
    }

    async deleteById(id: number): Promise<void> {
        const byId = await this.findById(id, false);

        if (!byId) {
            throw new NotFoundException(
                `Could not remove ${this.entityName} with ID: '${id}' because it does not exist.`
            );
        }
        await this.repository.delete({ id: id } as FindOptionsWhere<T>);
    }

    private async updateOrSave(entity): Promise<T> {
        await this.checkUniqueAttributes(entity);

        return await this.repository.save(entity as DeepPartial<T>);
    }
}
