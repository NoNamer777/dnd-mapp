import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityModule } from '../entity.module';
import { raceServiceProvider } from './providers';
import { RaceController } from './race.controller';
import { RaceEntity } from './race.entity';
import { RaceRepository } from './race.repository';
import { RaceService } from './race.service';

@Module({
    imports: [TypeOrmModule.forFeature([RaceEntity]), EntityModule],
    controllers: [RaceController],
    providers: [raceServiceProvider, RaceService, RaceRepository],
    exports: [raceServiceProvider, RaceService],
})
export class RaceModule {}
