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

    constructor(id?: number, name?: string) {
        super(id);

        if (name) this.name = name;
    }
}

export type CreateNameableEntityData = Omit<NameableModel, 'id'>;
