import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [],
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: false,
    }),
};

@Module({
    imports: [TypeOrmModule.forRootAsync(typeOrmConfig)],
    exports: [TypeOrmModule],
})
export class TypeOrmConfigModule {}
