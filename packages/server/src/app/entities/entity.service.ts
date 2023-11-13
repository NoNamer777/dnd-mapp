import { Injectable, InjectionToken } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EntityApiService, NameableEntity } from './models';

interface EntityType<T extends NameableEntity = NameableEntity> {
    type: string;
    serviceToken: InjectionToken;
    service?: EntityApiService<T>;
}

@Injectable()
export class EntityService {
    private entityTypes: EntityType[] = [];

    constructor(private readonly moduleRef: ModuleRef) {}

    addEntityType<T extends NameableEntity>(entityType: EntityType<T>) {
        this.entityTypes = [...this.entityTypes, entityType];

        this.entityTypes.find((eType) => eType.type === entityType.type).service = this.moduleRef.get(
            entityType.serviceToken,
            { strict: false }
        );
    }

    async getAllTypes() {
        return this.entityTypes.map((entityType) => entityType.type);
    }

    async getAllOfType(type: string) {
        return await this.getService(type).findAll();
    }

    async getOneOfTypeById(type: string, id: number) {
        return await this.getService(type).findById(id);
    }

    private getService(type: string) {
        return this.entityTypes.find((eType) => eType.type === type).service;
    }
}
