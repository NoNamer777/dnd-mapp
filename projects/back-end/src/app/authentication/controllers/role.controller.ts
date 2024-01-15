import { Role } from '@dnd-mapp/data';
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
import { LoggerService } from '../../common';
import { CreateRoleDto, RoleEntity } from '../entities';
import { IsAdminGuard } from '../guards';
import { RoleService } from '../services';

@UseGuards(IsAdminGuard)
@Controller('/api/user-role')
export class RoleController {
    constructor(
        private readonly skillService: RoleService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(RoleController.name);
    }

    @Get()
    async getAll(): Promise<Role[]> {
        this.logger.log('Received request for getting all User Roles');
        return await this.skillService.findAll();
    }

    @Post()
    async create(@Body() data: CreateRoleDto): Promise<Role> {
        this.logger.log('Received request for creating a new User Role');
        return await this.skillService.create(data);
    }

    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        this.logger.log('Received request for returning a User Role');
        return await this.skillService.findById(id);
    }

    @Delete('/:id')
    async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.logger.log('Received a request for removing a User Role');
        await this.skillService.remove(id);
    }

    @Put(':/id')
    async update(
        @Req() request: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() data: RoleEntity
    ): Promise<Role> {
        this.logger.log('Received a request for updating a User Role');
        const requestPath = request.path;

        if (id !== data.id) {
            throw new BadRequestException(
                `Could not update User Role on path: '${requestPath}' with data from User Role with ID: '${data.id}'`
            );
        }
        return await this.skillService.update(data);
    }
}
