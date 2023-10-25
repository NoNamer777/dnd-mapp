import { mockAbilityDB, mockRaceDB, mockSkillDB, mockUserDB } from '@dnd-mapp/data/testing';

beforeEach(() => {
    mockRaceDB.reset();
    mockAbilityDB.reset();
    mockSkillDB.reset();
    mockUserDB.reset();
});
