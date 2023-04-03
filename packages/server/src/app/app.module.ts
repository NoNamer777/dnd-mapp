import { Module } from '@nestjs/common';
import { RaceModule } from './models/race';
import { TypeOrmConfigModule } from './config';

@Module({
    imports: [RaceModule, TypeOrmConfigModule],
})
export class AppModule {}
