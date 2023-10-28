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
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { IsOwnerOrAdminGuard } from '../../authentication/guards';
import { DndMappLoggerService } from '../../common';
import { CreateUserDto, UserEntity } from './user.entity';
import { UserService } from './user.service';

@UseGuards(IsOwnerOrAdminGuard)
@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly logger: DndMappLoggerService
    ) {
        logger.setContext(UserController.name);
    }

    @Get()
    async getAll() {
        this.logger.log('Received request for getting all Users');
        return await this.userService.findAll();
    }

    @Post()
    async create(@Body() userData: CreateUserDto) {
        this.logger.log('Received request for creating a new User');
        return await this.userService.create(userData);
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) userId: number) {
        this.logger.log('Received request for returning a User');
        return await this.userService.findById(userId);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) userId: number) {
        this.logger.log('Received a request for removing a User');
        return await this.userService.remove(userId);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) userId: number, @Body() raceData: UserEntity, @Req() request: Request) {
        this.logger.log('Received a request for updating a User');
        const requestPath = request.url;

        if (userId !== raceData.id) {
            throw new BadRequestException(
                `Could not update User on path: '${requestPath}' with data from User with ID: '${raceData.id}'`
            );
        }
        return await this.userService.update(raceData);
    }
}
