import { mockAbilityDB, mockRaceDB, mockSkillDB, mockUserDB, mockUserRoleDB } from '@dnd-mapp/data/testing';

beforeEach(() => {
    mockRaceDB.reset();
    mockAbilityDB.reset();
    mockSkillDB.reset();
    mockUserDB.reset();
    mockUserRoleDB.reset();
});
