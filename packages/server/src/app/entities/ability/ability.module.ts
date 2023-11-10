import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { AbilityController } from './ability.controller';
import { AbilityEntity } from './ability.entity';
import { AbilityService } from './ability.service';
import { AbilityRepository } from './ability.repository';

@Module({
    imports: [TypeOrmModule.forFeature([AbilityEntity]), LoggingModule],
    providers: [AbilityService, abilityRepositoryProvider],
    controllers: [AbilityController],
})
export class AbilityModule {}
