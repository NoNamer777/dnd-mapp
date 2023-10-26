import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityController } from './ability.controller';
import { AbilityEntity } from './ability.entity';
import { abilityRepositoryProvider } from './ability.repository';
import { AbilityService } from './ability.service';

@Module({
    imports: [TypeOrmModule.forFeature([AbilityEntity])],
    providers: [AbilityService, abilityRepositoryProvider],
    controllers: [AbilityController],
})
export class AbilityModule {}
