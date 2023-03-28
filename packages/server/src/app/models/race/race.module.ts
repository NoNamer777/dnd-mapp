import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceRepositoryProvider } from '../../providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceEntity } from './race.entity';

@Module({
    providers: [RaceService, RaceRepositoryProvider],
    imports: [TypeOrmModule.forFeature([RaceEntity])],
})
export class RaceModule {}
