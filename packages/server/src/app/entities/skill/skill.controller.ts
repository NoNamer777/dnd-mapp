import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
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

    @Post()
    async create(@Body() data: CreateSkillData): Promise<Skill> {
        return await this.skillService.create(data);
    }

    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.skillService.findById(id);
    }
}
