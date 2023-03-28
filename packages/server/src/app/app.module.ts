import { Module } from '@nestjs/common';
import { RaceModule } from './models/race/race.module';

@Module({
    imports: [RaceModule],
})
export class AppModule {}
