import { CreateNameableEntityData, NameableEntityModel } from '@dnd-mapp/data';

export interface EntityApiService<T extends NameableEntityModel, C = CreateNameableEntityData> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    findByName(name: string): Promise<T | null>;
    update(entity: T): Promise<T>;
    create(entity: C): Promise<T>;
    remove(id: number): Promise<void>;
}
