import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRaceDB } from 'packages/data/testing';
import { RaceEntity } from '../../../../src/app/entities/race';

export const RaceRepositoryProvider = {
    provide: getRepositoryToken(RaceEntity),
    useValue: mockRaceDB,
};
