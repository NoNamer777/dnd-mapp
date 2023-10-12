import { BaseEntityModel } from './entity.model';

export enum RaceName {
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

export type RaceNames = (typeof RaceName)[keyof typeof RaceName];

export interface Race extends BaseEntityModel {
    name: RaceNames;
}

export type CreateRaceData = Omit<Race, 'id'>;
