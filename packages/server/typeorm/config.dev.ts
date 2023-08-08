import { DataSource } from 'typeorm';

const config = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'dnd_mapp',
    username: 'dnd_mapp_user',
    password: 'Osc_Wel2626!',
    migrations: ['packages/server/typeorm/migrations/*.ts'],
});

export default config;
