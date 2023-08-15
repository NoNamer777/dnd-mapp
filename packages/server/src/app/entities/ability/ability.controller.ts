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
import { Ability } from '@dnd-mapp/data';
import { AbilityService } from './ability.service';
import { Request } from 'express';

@Controller('/api/ability')
export class AbilityController {
    constructor(private abilityService: AbilityService) {}

    @Get()
    async getAll(): Promise<Ability[]> {
        return await this.abilityService.findAll();
    }

    @Post()
    async create(@Body() data: Omit<Ability, 'id'>): Promise<Ability> {
        return await this.abilityService.create(data);
    }

    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Ability> {
        return await this.abilityService.findById(id);
    }

    @Put('/:id')
    async update(
        @Req() request: Request,
        @Body() data: Ability,
        @Param('id', ParseIntPipe) id: number
    ): Promise<Ability> {
        const requestPath = request.path;

        if (id !== data.id) {
            throw new BadRequestException(
                `Could not update Ability on path: '${requestPath}' with data from Ability with ID: '${data.id}'.`
            );
        }
        return await this.abilityService.update(data);
    }

    @Delete('/:id')
    async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.abilityService.deleteById(id);
    }
}
