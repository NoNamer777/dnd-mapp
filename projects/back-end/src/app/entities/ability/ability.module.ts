import { Module } from '@nestjs/common';
import { EntityModule } from '../entity.module';
import { AbilityController } from './ability.controller';
import { AbilityRepository } from './ability.repository';
import { AbilityService } from './ability.service';
import { abilityServiceProvider } from './providers';

@Module({
    imports: [EntityModule],
    controllers: [AbilityController],
    providers: [abilityServiceProvider, AbilityService, AbilityRepository],
    exports: [abilityServiceProvider, AbilityService],
})
export class AbilityModule {}
