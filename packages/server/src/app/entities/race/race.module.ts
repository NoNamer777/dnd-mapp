import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { RaceController } from './race.controller';
import { RaceEntity } from './race.entity';
import { RaceService } from './race.service';
import { RaceRepository } from './race.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RaceEntity]), LoggingModule],
    controllers: [RaceController],
    providers: [RaceService, raceRepositoryProvider],
})
export class RaceModule {}
