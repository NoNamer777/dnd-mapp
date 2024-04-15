import { Module } from '@nestjs/common';
import { EntityModule } from '../entity.module';
import { skillServiceProvider } from './providers';
import { SkillController } from './skill.controller';
import { SkillRepository } from './skill.repository';
import { SkillService } from './skill.service';

@Module({
    imports: [EntityModule],
    controllers: [SkillController],
    providers: [skillServiceProvider, SkillService, SkillRepository],
    exports: [skillServiceProvider, SkillService],
})
export class SkillModule {}
