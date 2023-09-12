import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityController } from './ability.controller';
import { AbilityEntity } from './ability.entity';
import { AbilityService } from './ability.service';

@Module({
    imports: [TypeOrmModule.forFeature([AbilityEntity])],
    controllers: [AbilityController],
    providers: [AbilityService],
})
export class AbilityModule {}
