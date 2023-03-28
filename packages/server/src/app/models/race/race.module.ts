import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceEntity } from './race.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RaceEntity])],
    providers: [RaceService],
})
export class RaceModule {}
