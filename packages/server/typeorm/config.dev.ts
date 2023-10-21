import { DataSource } from 'typeorm';

function getMigrationsPath() {
    const databaseFilesPath = process.env.DATABASE_FILES_PATH;

    if (!databaseFilesPath) return ['./packages/server/typeorm/migrations/*.ts'];

    return [databaseFilesPath + '/migrations/*.ts'];
}

// Defaults to a Sqlite database which will persist its data in memory.
const config = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'dnd_mapp',
    username: 'dnd_mapp_user',
    password: 'Osc_Wel2626!',
    migrations: getMigrationsPath(),
});

export default config;
