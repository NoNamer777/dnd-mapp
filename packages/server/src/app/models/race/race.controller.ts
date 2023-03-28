import { RaceService } from './race.service';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { CreateRaceData, Race } from '@dnd-mapp/data';

@Controller('api/race')
export class RaceController {
    constructor(private raceService: RaceService) {}

    @Get()
    async getAll(): Promise<Race[]> {
        return await this.raceService.getAll();
    }

    @Post()
    async create(@Body() requestBody: CreateRaceData): Promise<Race> {
        return await this.raceService.create(requestBody);
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) raceId: number): Promise<Race> {
        return await this.raceService.getById(raceId);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) raceId: number): Promise<void> {
        return await this.raceService.deleteById(raceId);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) raceId: number, @Body() requestBody: Race): Promise<Race> {
        try {
            await this.raceService.getById(raceId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(
                    `Could not update Race on path: '/api/race/${raceId}', because it does not exist.`
                );
            }
        }
        if (raceId !== requestBody.id) {
            throw new BadRequestException(
                `'Could not update Race on path: '/api/race/${raceId}' with data from Race with ID: '${requestBody.id}'.`
            );
        }
        return await this.raceService.update(requestBody);
    }
}
