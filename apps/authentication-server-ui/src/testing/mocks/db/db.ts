import { mockUserDB } from './user';

export function resetDatabases() {
    mockUserDB.reset();
}
