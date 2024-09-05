import { RoleModel } from '@dnd-mapp/data';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LoggerService } from '../../common';
import { CreateRoleData } from '../entities';
import { IsAdminGuard } from '../guards';
import { RoleService } from '../services';

@UseGuards(IsAdminGuard)
@Controller('/api/role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(RoleController.name);
    }

    @Get()
    async getAll() {
        this.logger.log('Received request for getting all Roles');
        return await this.roleService.findAll();
    }

    @Post()
    async create(@Body() data: CreateRoleData) {
        this.logger.log('Received request for creating a new Role');
        return await this.roleService.create(data);
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        this.logger.log('Received request for returning a Role');
        return await this.roleService.findById(id);
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number) {
        this.logger.log('Received a request for removing a Role');
        await this.roleService.remove(id);
    }

    @Put(':/id')
    async update(@Req() request: Request, @Param('id') id: number, @Body() data: RoleModel) {
        this.logger.log('Received a request for updating a Role');
        const requestPath = request.path;

        if (id !== data.id) {
            throw new BadRequestException(
                `Could not update User Role on path: '${requestPath}' with data from User Role with ID: '${data.id}'`
            );
        }
        return await this.roleService.update(data);
    }
}
