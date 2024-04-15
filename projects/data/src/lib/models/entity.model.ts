import { IsNotEmpty, IsString } from 'class-validator';

export class EntityModel {
    @IsString()
    @IsNotEmpty()
    id: string;
}

export class NameableModel extends EntityModel {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export type CreateNameableEntityData = Omit<NameableModel, 'id'>;
