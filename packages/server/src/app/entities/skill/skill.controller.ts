import {
    Controller,
    Get,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillData, Skill } from '@dnd-mapp/data';
@Controller('/api/skill')
export class SkillController {
    constructor(private skillService: SkillService) {}

    @Get()
    async getAll(): Promise<Skill[]> {
        return await this.skillService.findAll();
    }
