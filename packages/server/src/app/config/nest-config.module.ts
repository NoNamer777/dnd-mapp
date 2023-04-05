import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import config from './config';
import { validate } from './validation/server-config.validator';

const configOptions: ConfigModuleOptions = {
    load: [config],
    ignoreEnvFile: true,
    isGlobal: true,
    validate,
};

@Module({
    imports: [ConfigModule.forRoot({ ...configOptions })],
    exports: [ConfigModule],
})
export class NestConfigModule {}
