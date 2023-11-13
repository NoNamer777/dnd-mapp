import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { EntityModule } from '../entity.module';
import { RaceController } from './race.controller';
import { RaceEntity } from './race.entity';
import { RaceRepository } from './race.repository';
import { RACE_SERVICE_TOKEN, RaceService } from './race.service';

export const raceServiceProvider = {
    provide: RACE_SERVICE_TOKEN,
    useExisting: RaceService,
};

@Module({
    imports: [TypeOrmModule.forFeature([RaceEntity]), LoggingModule, EntityModule],
    controllers: [RaceController],
    providers: [raceServiceProvider, RaceService, RaceRepository],
    exports: [raceServiceProvider, RaceService],
})
export class RaceModule {}
