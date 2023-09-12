import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';

export type SaveOrUpdateOperation = 'create' | 'update';

export abstract class BaseEntityCrudService<T extends BaseEntity = BaseEntity> {
    protected constructor(private repository: Repository<T>, private entityName: string) {}

    protected abstract checkUniqueAttributes(
        entity: T | Omit<T, 'id'>,
        operation: SaveOrUpdateOperation
    ): Promise<void>;

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
        return await this.updateOrSave(entity, 'update');
    }

    async create(entity: Omit<T, 'id'>): Promise<T> {
        return await this.updateOrSave(entity, 'create');
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

    private async updateOrSave(entity: T | Omit<T, 'id'>, operation: SaveOrUpdateOperation): Promise<T> {
        await this.checkUniqueAttributes(entity, operation);

        return await this.repository.save(entity as DeepPartial<T>);
    }
}
