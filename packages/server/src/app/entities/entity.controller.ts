import { Controller, Get, Query } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { EntityService } from './entity.service';

class AllByTypeQueryParams {
    @IsString()
    @IsNotEmpty()
    type: string;
}

@Controller('/api/entity')
export class EntityController {
    constructor(private readonly entityService: EntityService) {}

    @Get()
    async getAllTypes() {
        return this.entityService.getAllTypes();
}
