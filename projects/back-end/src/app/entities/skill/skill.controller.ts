import { CreateSkillData, Skill } from '@dnd-mapp/data';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoggerService } from '../../common';
import { SkillService } from './skill.service';

@Controller('/api/skill')
export class SkillController {
    constructor(
        private readonly skillService: SkillService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(SkillController.name);
    }

    @Get()
    async getAll() {
        this.logger.log('Received request for getting all Skills');
        return await this.skillService.findAll();
    }

    @Post()
    async create(@Body() data: CreateSkillData) {
        this.logger.log('Received request for creating a new Skill');
        return await this.skillService.create(data);
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        this.logger.log('Received request for returning a Skill');
        return await this.skillService.findById(id);
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number) {
        this.logger.log('Received a request for removing a Skill');
        await this.skillService.remove(id);
    }

    @Put(':/id')
    async update(@Req() request: Request, @Param('id') id: number, @Body() data: Skill) {
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
