import { mockAbilityDB, mockRaceDB, mockSkillDB } from './api';
import { mockRoleDB, mockSessionDB, mockTokenDB, mockUserDB } from './authentication';

export function resetDatabases() {
    mockAbilityDB.reset();
    mockSkillDB.reset();
    mockRaceDB.reset();

    mockRoleDB.reset();
    mockTokenDB.reset();
    mockUserDB.reset();
    mockSessionDB.reset();
}
