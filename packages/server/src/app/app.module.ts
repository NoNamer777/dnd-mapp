import { Module } from '@nestjs/common';
import { RaceModule } from './models/races/race.module';

@Module({
    imports: [RaceModule],
})
export class AppModule {}
