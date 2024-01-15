import { mockRaceDB } from '@dnd-mapp/data/testing';
import { RaceRepository, RaceService } from '../../../../src/app/entities/race';

export const mockRaceModuleProviders = [
    RaceService,
    {
        provide: RaceRepository,
        useValue: mockRaceDB,
    },
];
