import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './config';
import { NestConfigModule } from './config/nest-config.module';
import { AbilityModule } from './entities/ability';
import { RaceModule } from './entities/race';
import { SkillModule } from './entities/skill';

@Module({
    imports: [NestConfigModule, TypeOrmConfigModule, RaceModule, AbilityModule, SkillModule],
})
export class AppModule {}
