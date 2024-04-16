import {
    mockAbilityDB,
    mockRaceDB,
    mockRoleDB,
    mockSessionDB,
    mockSkillDB,
    mockTokenDB,
    mockUserDB,
} from '@dnd-mapp/data/testing';

export function resetDBs() {
    mockUserDB.reset();
    mockTokenDB.reset();
    mockRoleDB.reset();
    mockSessionDB.reset();

    mockSkillDB.reset();
    mockRaceDB.reset();
    mockAbilityDB.reset();
}
