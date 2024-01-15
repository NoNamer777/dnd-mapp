import { NameableEntityModel } from '../models';

export type Race = NameableEntityModel;

export type CreateRaceData = Omit<Race, 'id'>;
