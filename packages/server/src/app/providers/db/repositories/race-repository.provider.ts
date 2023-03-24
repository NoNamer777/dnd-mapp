import { mockRaceDb } from '@dnd-mapp/data/testing';

export const RACE_REPO_TOKEN = 'RACE_REPO';

export const RaceRepositoryProvider = {
    provide: RACE_REPO_TOKEN,
    useValue: mockRaceDb,
};
