import { mockRaceDb } from 'packages/data/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RaceEntity } from '../../../../src/app/models/race';

export const RaceRepositoryProvider = {
    provide: getRepositoryToken(RaceEntity),
    useValue: mockRaceDb,
};
