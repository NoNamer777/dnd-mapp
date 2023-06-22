import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './config';
import { NestConfigModule } from './config/nest-config.module';
import { RaceModule } from './entities/race';

@Module({
    imports: [NestConfigModule, TypeOrmConfigModule, RaceModule],
})
export class AppModule {}
