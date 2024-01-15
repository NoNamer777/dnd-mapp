import {
    mockAbilityDB,
    mockClientDB,
    mockRaceDB,
    mockSkillDB,
    mockUserDB,
    mockUserRoleDB,
} from '@dnd-mapp/data/testing';

beforeEach(() => {
    mockRaceDB.reset();
    mockAbilityDB.reset();
    mockSkillDB.reset();
    mockClientDB.reset();
    mockUserDB.reset();
    mockUserRoleDB.reset();
});
