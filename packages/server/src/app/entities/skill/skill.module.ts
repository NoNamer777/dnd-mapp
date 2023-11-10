import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { SkillController } from './skill.controller';
import { SkillEntity } from './skill.entity';
import { SkillService } from './skill.service';
import { SkillRepository } from './skill.repository';

@Module({
    imports: [TypeOrmModule.forFeature([SkillEntity]), LoggingModule],
    providers: [SkillService, skillRepositoryProvider],
    controllers: [SkillController],
})
export class SkillModule {}
