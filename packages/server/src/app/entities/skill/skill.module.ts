import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillController } from './skill.controller';
import { SkillEntity } from './skill.entity';
import { skillRepositoryProvider } from './skill.repository';
import { SkillService } from './skill.service';

@Module({
    imports: [TypeOrmModule.forFeature([SkillEntity])],
    providers: [SkillService, skillRepositoryProvider],
    controllers: [SkillController],
})
export class SkillModule {}
