import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export abstract class BaseEntityCrudService<T extends BaseEntity = BaseEntity> {
    private repository: Repository<T>;

    protected constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    abstract checkUniqueAttributes(entity: T): Promise<void>;

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: number, throwsError = true): Promise<T> {
        const byId = await this.repository.findOneBy({ id: id } as FindOptionsWhere<T>);

        if (!byId && throwsError) {
            throw new NotFoundException();
        }
        return byId;
    }

    async update(entity: T): Promise<T> {
        const byId = await this.findById(entity.id, false);

        if (!byId) {
            throw new NotFoundException();
        }
        return await this.updateOrSave(entity);
    }

    async create(entity: Omit<T, 'id'>): Promise<T> {
        return await this.updateOrSave(entity);
    }

    async deleteById(id: number): Promise<void> {
        const byId = await this.findById(id, false);

        if (!byId) {
            throw new NotFoundException();
        }
        await this.repository.delete({ id: id } as FindOptionsWhere<T>);
    }

    private async updateOrSave(entity): Promise<T> {
        await this.checkUniqueAttributes(entity);

        return await this.repository.save(entity as DeepPartial<T>);
    }
}
