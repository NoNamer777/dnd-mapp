import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    type: process.env.DATABASE_TYPE || 'sqlite',
    database: process.env.DATABASE_LOCATION || ':memory:',
    logging: process.env.DATABASE_LOG_LEVEL?.split(',') || ['info', 'error', 'warn'],
    logger: process.env.DATABASE_LOG_TYPE || 'advanced-console',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
}));
