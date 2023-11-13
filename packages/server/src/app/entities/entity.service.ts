import { Injectable, InjectionToken } from '@nestjs/common';
import { EntityApiService, NameableEntity } from './models';

interface EntityType<T extends NameableEntity = NameableEntity> {
    type: string;
    serviceToken: InjectionToken;
}

@Injectable()
export class EntityService {
    private entityTypes: EntityType[] = [];

    addEntityType<T extends NameableEntity>(entityType: EntityType<T>) {
        this.entityTypes = [...this.entityTypes, entityType];
    }

    async getAllTypes() {
        return this.entityTypes.map((entityType) => entityType.type);
    }
}
