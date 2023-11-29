import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { validate } from '../validation/server-config.validator';
import databaseConfig from './database.config';
import serverConfig from './server.config';

const configOptions: ConfigModuleOptions = {
    load: [databaseConfig, serverConfig],
    envFilePath: ['.env', '.env.prod', '.env.dev', '.env.e2e', '.env.test'],
    isGlobal: true,
    validate,
};

@Module({
    imports: [ConfigModule.forRoot(configOptions)],
    exports: [ConfigModule],
})
export class NestConfigModule {}
