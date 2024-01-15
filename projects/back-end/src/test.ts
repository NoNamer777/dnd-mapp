import { mockAbilityDB, mockClientDB, mockRaceDB, mockRoleDB, mockSkillDB, mockUserDB } from '@dnd-mapp/data/testing';

beforeEach(() => {
    mockRaceDB.reset();
    mockAbilityDB.reset();
    mockSkillDB.reset();
    mockClientDB.reset();
    mockUserDB.reset();
    mockRoleDB.reset();
});
