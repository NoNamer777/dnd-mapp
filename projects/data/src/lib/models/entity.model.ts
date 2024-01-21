import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class EntityModel {
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive()
    id: number;

    constructor(id?: number) {
        if (!id) return;
        this.id = id;
    }
}

export class NameableModel extends EntityModel {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export type CreateNameableEntityData = Omit<NameableModel, 'id'>;
