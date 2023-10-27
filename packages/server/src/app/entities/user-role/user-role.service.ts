import { UserRole, UserRoleName } from '@dnd-mapp/data';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DndMappLoggerService } from '../../common/logging/dnd-mapp-logger.service';
import { CreateUserRoleDto, UserRoleEntity } from './user-role.entity';
import { UserRoleRepository } from './user-role.repository';

@Injectable()
export class UserRoleService {
    constructor(
        @InjectRepository(UserRoleEntity) private readonly userRoleRepository: UserRoleRepository,
        private readonly logger: DndMappLoggerService
    ) {
        this.logger.setContext(UserRoleService.name);
    }

    async findAll(): Promise<UserRole[]> {
        this.logger.log('Finding all User Roles');
        return this.userRoleRepository.findAll();
    }

    async findById(id: number, throwsError = true): Promise<UserRole> {
        this.logger.log('Finding a User Role by ID');
        const byId = await this.userRoleRepository.findOneById(id);

        if (!byId && throwsError) {
            throw new NotFoundException(`User Role with ID: '${id}' is not found`);
        }
        return byId;
    }

    async findByName(name: UserRoleName, throwsError = true): Promise<UserRole> {
        this.logger.log('Finding a User Role by name');
        const byName = await this.userRoleRepository.findOneByName(name);

        if (!byName && throwsError) {
            throw new NotFoundException(`User Role with name: '${name}' is not found`);
        }
        return byName;
    }

    async update(role: UserRole): Promise<UserRole> {
        this.logger.log(`Updating a User Role's data`);
        const byId = await this.findById(role.id, false);

        if (!byId) {
            throw new NotFoundException(`Cannot update User Role with ID: '${role.id}' because it does not exist`);
        }
        const byName = await this.findByName(role.name, false);

        if (byName && byName.id !== role.id) {
            throw new BadRequestException(`Cannot update User Role because the name '${byName.name}' is already used`);
        }
        return await this.userRoleRepository.save(role);
    }

    async create(role: CreateUserRoleDto): Promise<UserRole> {
        this.logger.log('Creating a new User Role');
        const byName = await this.findByName(role.name, false);

        if (byName) {
            throw new BadRequestException(`Cannot create User Role because the name '${byName.name}' is already used`);
        }
        return await this.userRoleRepository.save(role);
    }

    async remove(id: number): Promise<void> {
        this.logger.log('Removing a User Role by ID');
        const byId = await this.findById(id, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove User Role with ID: '${id}' because it does not exist`);
        }
        await this.userRoleRepository.deleteById(id);
    }
}
