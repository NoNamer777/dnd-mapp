import { CreateUserData, UserModel } from '@dnd-mapp/data';
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
    async getById(@Param('id') id: string) {
        this.logger.log('Received request for returning a User');
        return await this.userService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UserModel, @Req() request: Request) {
        this.logger.log('Received a request for updating a User');
        const requestPath = request.url;

        if (id !== data.id) {
            throw new BadRequestException(
                `Could not update User on path: '${requestPath}' with data from User with ID: '${data.id}'`
            );
        }
        return await this.userService.update(data);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        this.logger.log('Received a request for removing a User');
        return await this.userService.remove(id);
    }
}
