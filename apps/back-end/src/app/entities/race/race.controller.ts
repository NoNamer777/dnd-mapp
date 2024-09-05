import { RaceModel } from '@dnd-mapp/data';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { IsAdminGuard } from '../../authentication/guards';
import { LoggerService } from '../../common';
import { CreateRaceData } from './race.entity';
import { RaceService } from './race.service';

@Controller('api/race')
export class RaceController {
    constructor(
        private readonly raceService: RaceService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(RaceController.name);
    }

    @Get()
    async getAll() {
        this.logger.log('Received request for getting all Races');
        return await this.raceService.findAll();
    }

    @UseGuards(IsAdminGuard)
    @Post()
    async create(@Body() requestBody: CreateRaceData) {
        this.logger.log('Received request for creating a new Race');
        return await this.raceService.create(requestBody);
    }

    @Get(':id')
    async getById(@Param('id') raceId: number) {
        this.logger.log('Received request for returning a Race');
        return await this.raceService.findById(raceId);
    }

    @UseGuards(IsAdminGuard)
    @Delete(':id')
    async delete(@Param('id') raceId: number) {
        this.logger.log('Received a request for removing a Race');
        return await this.raceService.remove(raceId);
    }

    @UseGuards(IsAdminGuard)
    @Put(':id')
    async update(@Param('id') raceId: number, @Body() requestBody: RaceModel, @Req() request: Request) {
        this.logger.log('Received a request for updating a Race');
        const requestPath = request.url;

        if (raceId !== requestBody.id) {
            throw new BadRequestException(
                `Could not update Race on path: '${requestPath}' with data from Race with ID: '${requestBody.id}'`
            );
        }
        return await this.raceService.update(requestBody);
    }
}
