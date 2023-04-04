import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const typeOrmConfig = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [],
        autoLoadEntities: true,
        synchronize: false,
        logging: ['info', 'error', 'warn'],
    }),
};

@Module({
    imports: [TypeOrmModule.forRootAsync(typeOrmConfig)],
    exports: [TypeOrmModule],
})
export class TypeOrmConfigModule {}
