import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

type DataSourceTypeValue = MysqlConnectionOptions['type'] | SqliteConnectionOptions['type'];

function getMigrationsPath() {
    const databaseFilesPath = process.env.DATABASE_FILES_PATH;

    if (!databaseFilesPath) return ['./packages/server/typeorm/migrations/*.ts'];

    return [databaseFilesPath + '/migrations/*.ts'];
}

// Defaults to a Sqlite database which will persist its data in memory.
const config = new DataSource({
    type: (process.env.DATABASE_TYPE as DataSourceTypeValue) || 'sqlite',
    database: process.env.DATABASE_LOCATION || './dnd_mapp_db.db',
    migrations: getMigrationsPath(),
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
});

export default config;
