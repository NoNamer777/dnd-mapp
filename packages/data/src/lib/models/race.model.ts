import { NameableEntityModel } from './entity.model';

export type Race = NameableEntityModel;

export type CreateRaceData = Omit<Race, 'id'>;
