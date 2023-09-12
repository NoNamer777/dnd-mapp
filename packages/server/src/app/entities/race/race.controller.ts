import { CreateRaceData, Race } from '@dnd-mapp/data';
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
import { RaceService } from './race.service';

@Controller('api/race')
export class RaceController {
    constructor(private raceService: RaceService) {}

    @Get()
    async getAll(): Promise<Race[]> {
        return await this.raceService.findAll();
    }

    @Post()
    async create(@Body() requestBody: CreateRaceData): Promise<Race> {
        return await this.raceService.create(requestBody);
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) raceId: number): Promise<Race> {
        return await this.raceService.findById(raceId);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) raceId: number): Promise<void> {
        return await this.raceService.deleteById(raceId);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) raceId: number,
        @Body() requestBody: Race,
        @Req() request: Request
    ): Promise<Race> {
        const requestPath = request.url;

        if (raceId !== requestBody.id) {
            throw new BadRequestException(
                `Could not update Race on path: '${requestPath}' with data from Race with ID: '${requestBody.id}'.`
            );
        }
        return await this.raceService.update(requestBody);
    }
}
