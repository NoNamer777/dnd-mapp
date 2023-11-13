import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { EntityModule } from '../entity.module';
import { SkillController } from './skill.controller';
import { SkillEntity } from './skill.entity';
import { SkillRepository } from './skill.repository';
import { SKILL_SERVICE_TOKEN, SkillService } from './skill.service';

export const skillServiceProvider = {
    provide: SKILL_SERVICE_TOKEN,
    useExisting: SkillService,
};

@Module({
    imports: [TypeOrmModule.forFeature([SkillEntity]), LoggingModule, EntityModule],
    controllers: [SkillController],
    providers: [skillServiceProvider, SkillService, SkillRepository],
    exports: [skillServiceProvider, SkillService],
})
export class SkillModule {}
