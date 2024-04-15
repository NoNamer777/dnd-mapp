import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IsAdminGuard } from '../authentication/guards';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EntityService } from './entity.service';

class AllByTypeQueryParams {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    id?: string;
}

@UseGuards(IsAdminGuard)
@Controller('/api/entity')
export class EntityController {
    constructor(private readonly entityService: EntityService) {}

    @Get()
    async getAllTypes() {
        return this.entityService.getAllTypes();
    }

    @Get('/by')
    async getOfType(@Query() queryParams: AllByTypeQueryParams) {
        const { type, id } = queryParams;

        if (id) {
            return await this.entityService.getOneOfTypeById(type, id);
        }
        return await this.entityService.getAllOfType(type);
    }
}
