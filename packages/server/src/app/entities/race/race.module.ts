import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceController } from './race.controller';
import { RaceEntity } from './race.entity';
import { raceRepositoryProvider } from './race.repository';
import { RaceService } from './race.service';

@Module({
    imports: [TypeOrmModule.forFeature([RaceEntity])],
    controllers: [RaceController],
    providers: [RaceService, raceRepositoryProvider],
})
export class RaceModule {}
