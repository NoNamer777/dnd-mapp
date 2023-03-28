import { Module } from '@nestjs/common';
import { RaceModule } from './models/race';

@Module({
    imports: [RaceModule],
})
export class AppModule {}
