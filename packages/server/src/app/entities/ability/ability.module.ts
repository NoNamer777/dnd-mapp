import { Module } from '@nestjs/common';
import { AbilityController } from './ability.controller';
import { AbilityService } from './ability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityEntity } from './ability.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AbilityEntity])],
    controllers: [AbilityController],
    providers: [AbilityService],
})
export class AbilityModule {}
