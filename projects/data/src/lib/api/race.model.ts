import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EntityModel } from '../models';

export enum Races {
    DWARF = 'Dwarf',
    ELF = 'Elf',
    HALFLING = 'Halfling',
    HUMAN = 'Human',
    HUMAN_VARIANT = 'Human (Variant)',
    DRAGONBORN = 'Dragonborn',
    GNOME = 'Gnome',
    HALF_ELF = 'Half-Elf',
    HALF_ORC = 'Half-Orc',
    TIEFLING = 'Tiefling',
}

export type RaceName = (typeof Races)[keyof typeof Races];

export class RaceModel extends EntityModel {
    @IsString()
    @IsNotEmpty()
    @IsEnum(Races)
    name: RaceName;

    constructor(id?: number, name?: RaceName) {
        super(id);

        if (name) this.name = name;
    }
}

export type CreateRaceData = Omit<RaceModel, 'id'>;
