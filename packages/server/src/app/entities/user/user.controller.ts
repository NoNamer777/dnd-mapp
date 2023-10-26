import { User } from '@dnd-mapp/data';
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
import { CreateUserDto, UserEntity } from './user.entity';
import { UserService } from './user.service';

// TODO: Secure routes for Administrators or the User itself only

@Controller('api/user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(private userService: UserService) {}

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
    async update(
        @Param('id', ParseIntPipe) userId: number,
        @Body() raceData: UserEntity,
        @Req() request: Request
    ): Promise<User> {
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
