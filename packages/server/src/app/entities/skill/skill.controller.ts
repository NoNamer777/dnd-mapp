import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillData, Skill } from '@dnd-mapp/data';
import { Request } from 'express';

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

    @Put(':/id')
    async update(@Req() request: Request, @Param('id', ParseIntPipe) id: number, @Body() data: Skill): Promise<Skill> {
        const requestPath = request.path;

        if (id !== data.id) {
            throw new BadRequestException(
                `Could not update Skill on path: '${requestPath}' with data from Skill with ID: '${data.id}'.`
            );
        }
        return await this.skillService.update(data);
    }
}
