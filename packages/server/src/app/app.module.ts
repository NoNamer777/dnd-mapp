import { Module } from '@nestjs/common';
import { RaceModule } from './models/race';
import { TypeOrmConfigModule } from './config';
import { NestConfigModule } from './config/nest-config.module';

@Module({
    imports: [NestConfigModule, TypeOrmConfigModule, RaceModule],
})
export class AppModule {}
