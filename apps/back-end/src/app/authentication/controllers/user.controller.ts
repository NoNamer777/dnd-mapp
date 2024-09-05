import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { LoggerService } from '../../common';
import { CreateUserData, UpdateUserData } from '../entities';
import { IsOwnerOrAdminGuard } from '../guards';
import { UserService } from '../services';

@UseGuards(IsOwnerOrAdminGuard)
@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(UserController.name);
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async getAll() {
        this.logger.log('Received request for getting all Users');
        return await this.userService.findAll();
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() data: CreateUserData) {
        this.logger.log('Received request for creating a new User');
        return await this.userService.create(data);
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        this.logger.log('Received request for returning a User');
        return await this.userService.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.logger.log('Received a request for removing a User');
        return await this.userService.remove(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UpdateUserData, @Req() request: Request) {
        this.logger.log('Received a request for updating a User');
        const requestPath = request.url;

        if (id !== data.id) {
            throw new BadRequestException(
                `Could not update User on path: '${requestPath}' with data from User with ID: '${data.id}'`
            );
        }
        return await this.userService.update(data);
    }
}
