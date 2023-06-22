import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Ability } from '@dnd-mapp/data';
import { AbilityService } from './ability.service';

@Controller('/api/ability')
export class AbilityController {
    constructor(private abilityService: AbilityService) {}

    @Get()
    async getAll(): Promise<Ability[]> {
        return await this.abilityService.findAll();
    }

    @Post()
    async create(data: Omit<Ability, 'id'>): Promise<Ability> {
        return await this.abilityService.create(data);
    }

    @Get('/:id')
    async getById(id: number): Promise<Ability> {
        return await this.abilityService.findById(id);
    }

    @Put('/:id')
    async update(data: Ability): Promise<Ability> {
        return await this.abilityService.update(data);
    }

    @Delete('/:id')
    async deleteById(id: number): Promise<void> {
        await this.abilityService.deleteById(id);
    }
}
