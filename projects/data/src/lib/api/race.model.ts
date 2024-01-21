import { NameableModel } from '../models';

export class Race extends NameableModel {}

export type CreateRaceData = Omit<Race, 'id'>;
