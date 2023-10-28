import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
    UseInterceptors,
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
    @UseInterceptors(ClassSerializerInterceptor)
    async getAll() {
        this.logger.log('Received request for getting all Users');
        return await this.userService.findAll();
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() data: CreateUserDto) {
        this.logger.log('Received request for creating a new User');
        return await this.userService.create(data);
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        this.logger.log('Received request for returning a User');
        return await this.userService.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        this.logger.log('Received a request for removing a User');
        return await this.userService.remove(id);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: UserEntity, @Req() request: Request) {
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
