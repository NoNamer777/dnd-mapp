import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import databaseConfig from './database.config';
import serverConfig from './server.config';
import { validate } from './validation/server-config.validator';

const configOptions: ConfigModuleOptions = {
    load: [databaseConfig, serverConfig],
    envFilePath: ['.env', '.prod.env', '.dev.env', '.e2e.env'],
    isGlobal: true,
    validate,
};

@Module({
    imports: [ConfigModule.forRoot(configOptions)],
    exports: [ConfigModule],
})
export class NestConfigModule {}
