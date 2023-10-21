import { Ability } from '@dnd-mapp/data';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AbilityService } from './ability.service';

@Controller('/api/ability')
export class AbilityController {
    private readonly logger = new Logger(AbilityController.name);

    constructor(private abilityService: AbilityService) {}

    @Get()
    async getAll(): Promise<Ability[]> {
        this.logger.log('Received request for getting all Abilities');
        return await this.abilityService.findAll();
    }

    @Post()
    async create(@Body() data: Omit<Ability, 'id'>): Promise<Ability> {
        this.logger.log('Received request for creating a new Ability');
        return await this.abilityService.create(data);
    }

    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Ability> {
        this.logger.log('Received request for returning a Ability');
        return await this.abilityService.findById(id);
    }

    @Delete('/:id')
    async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.logger.log('Received a request for removing a Ability');
        await this.abilityService.deleteById(id);
    }

    @Put('/:id')
    async update(
        @Req() request: Request,
        @Body() data: Ability,
        @Param('id', ParseIntPipe) id: number
    ): Promise<Ability> {
        this.logger.log('Received a request for updating a Ability', 'AbilityController');
        const requestPath = request.path;

        if (id !== data.id) {
            throw new BadRequestException(
                `Could not update Ability on path: '${requestPath}' with data from Ability with ID: '${data.id}'.`
            );
        }
        return await this.abilityService.update(data);
    }
}
