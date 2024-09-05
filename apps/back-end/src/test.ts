import {
    mockAbilityDB,
    mockClientDB,
    mockRaceDB,
    mockRoleDB,
    mockSkillDB,
    mockTokenDB,
    mockUserDB,
} from '@dnd-mapp/data/testing';

beforeEach(() => {
    mockClientDB.reset();
    mockUserDB.reset();
    mockRoleDB.reset();
    mockTokenDB.reset();

    mockRaceDB.reset();
    mockAbilityDB.reset();
    mockSkillDB.reset();
});
