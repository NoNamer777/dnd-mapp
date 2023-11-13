import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { EntityModule } from '../entity.module';
import { AbilityController } from './ability.controller';
import { AbilityEntity } from './ability.entity';
import { AbilityRepository } from './ability.repository';
import { ABILITY_SERVICE_TOKEN, AbilityService } from './ability.service';

const abilityServiceProvider = { provide: ABILITY_SERVICE_TOKEN, useExisting: AbilityService };

@Module({
    imports: [TypeOrmModule.forFeature([AbilityEntity]), LoggingModule, EntityModule],
    controllers: [AbilityController],
    providers: [abilityServiceProvider, AbilityService, AbilityRepository],
    exports: [abilityServiceProvider, AbilityService],
})
export class AbilityModule {}
