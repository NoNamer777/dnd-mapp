import { CreateNameableEntityData, NameableModel } from '@dnd-mapp/data';

export interface EntityApiService<T extends NameableModel, C = CreateNameableEntityData> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findByName(name: string): Promise<T | null>;
    update(entity: T): Promise<T>;
    create(entity: C): Promise<T>;
    remove(id: string): Promise<void>;
}
