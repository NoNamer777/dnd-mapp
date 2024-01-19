import { registerAs } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export type DatabaseConfig = { migrationFilesPath: string } & (MysqlConnectionOptions | SqliteConnectionOptions);

export default registerAs('database', () => ({
    type: process.env.DATABASE_TYPE || 'sqlite',
    database: process.env.DATABASE_LOCATION || ':memory:',
    migrationFilesPath: process.env.MIGRATION_FILES_PATH || 'dist/back-end/db/migrations/*.js',
    logging: process.env.DATABASE_LOG_LEVEL?.split(',') || ['info', 'error', 'warn'],
    logger: process.env.DATABASE_LOG_TYPE || 'advanced-console',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
}));
