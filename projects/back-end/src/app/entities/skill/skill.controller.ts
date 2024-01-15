import { Skill } from '@dnd-mapp/data';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { DndMappLoggerService } from '../../common';
import { CreateSkillDto, SkillEntity } from './skill.entity';
import { SkillService } from './skill.service';

@Controller('/api/skill')
export class SkillController {
    constructor(
        private readonly skillService: SkillService,
        private readonly logger: DndMappLoggerService
    ) {
        logger.setContext(SkillController.name);
    }

    @Get()
    async getAll(): Promise<Skill[]> {
        this.logger.log('Received request for getting all Skills');
        return await this.skillService.findAll();
    }

    @Post()
    async create(@Body() data: CreateSkillDto): Promise<Skill> {
        this.logger.log('Received request for creating a new Skill');
        return await this.skillService.create(data);
    }

    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        this.logger.log('Received request for returning a Skill');
        return await this.skillService.findById(id);
    }

    @Delete('/:id')
    async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.logger.log('Received a request for removing a Skill');
        await this.skillService.remove(id);
    }

    @Put(':/id')
    async update(
        @Req() request: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() data: SkillEntity
    ): Promise<Skill> {
        this.logger.log('Received a request for updating a Skill');
        const requestPath = request.path;

        if (id !== data.id) {
            throw new BadRequestException(
                `Could not update Skill on path: '${requestPath}' with data from Skill with ID: '${data.id}'`
            );
        }
        return await this.skillService.update(data);
    }
}