import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { IsAdminGuard } from '../authentication/guards';
import { EntityService } from './entity.service';

class AllByTypeQueryParams {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    id?: number;
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
