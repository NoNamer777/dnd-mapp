import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { AbilityController } from './ability.controller';
import { AbilityEntity } from './ability.entity';
import { abilityRepositoryProvider } from './ability.repository';
import { AbilityService } from './ability.service';

@Module({
    imports: [TypeOrmModule.forFeature([AbilityEntity]), LoggingModule],
    providers: [AbilityService, abilityRepositoryProvider],
    controllers: [AbilityController],
})
export class AbilityModule {}
