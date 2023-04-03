import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { validate } from './validation/server-config.validator';
import environment from '../../environments/environment';

const configOptions: ConfigModuleOptions = {
    load: [environment],
    ignoreEnvFile: true,
    isGlobal: true,
    validate,
};

@Module({
    imports: [ConfigModule.forRoot({ ...configOptions })],
    exports: [ConfigModule],
})
export class NestConfigModule {}
