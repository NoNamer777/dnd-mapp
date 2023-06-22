import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceEntity } from './race.entity';
import { RaceController } from './race.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RaceEntity])],
    controllers: [RaceController],
    providers: [RaceService],
})
export class RaceModule {}
