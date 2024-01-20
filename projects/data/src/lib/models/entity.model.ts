export class EntityModel {
    id: number;

    constructor(id?: number) {
        if (!id) return;
        this.id = id;
    }
}

export class NameableEntityModel extends EntityModel {
    name: string;
}

export type CreateNameableEntityData = Omit<NameableEntityModel, 'id'>;
