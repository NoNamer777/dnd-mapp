export interface EntityModel {
    id: number;
}

export interface NameableEntityModel extends EntityModel {
    name: string;
}

export type CreateNameableEntityData = Omit<NameableEntityModel, 'id'>;
