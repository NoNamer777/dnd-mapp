import {
    mockAbilityDB,
    mockRaceDB,
    mockRoleDB,
    mockSessionDB,
    mockSkillDB,
    mockTokenDB,
    mockUserDB,
} from '@dnd-mapp/data/testing';

beforeEach(() => {
    mockSessionDB.reset();
    mockUserDB.reset();
    mockRoleDB.reset();
    mockTokenDB.reset();

    mockRaceDB.reset();
    mockAbilityDB.reset();
    mockSkillDB.reset();
});
