import { mockRaceDB } from 'packages/data/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RaceEntity } from '../../../../src/app/entities/race';

export const RaceRepositoryProvider = {
    provide: getRepositoryToken(RaceEntity),
    useValue: mockRaceDB,
};
