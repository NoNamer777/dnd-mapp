import { Module } from '@nestjs/common';
import { EntityModule } from '../entity.module';
import { raceServiceProvider } from './providers';
import { RaceController } from './race.controller';
import { RaceRepository } from './race.repository';
import { RaceService } from './race.service';

@Module({
    imports: [EntityModule],
    controllers: [RaceController],
    providers: [raceServiceProvider, RaceService, RaceRepository],
    exports: [raceServiceProvider, RaceService],
})
export class RaceModule {}
