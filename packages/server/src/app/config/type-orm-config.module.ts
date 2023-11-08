import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.config';

const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        ...configService.get<DatabaseConfig>('database'),
        entities: [],
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true,
        migrations: [configService.get<DatabaseConfig>('database').migrationFilesPath],
    }),
};

@Module({
    imports: [TypeOrmModule.forRootAsync(typeOrmConfig)],
    exports: [TypeOrmModule],
})
export class TypeOrmConfigModule {}
