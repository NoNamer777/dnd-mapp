import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceRepositoryProvider } from '../../providers';

@Module({
    providers: [RaceService, RaceRepositoryProvider],
})
export class RaceModule {}
