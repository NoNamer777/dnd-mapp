import { CreateRoleData, RoleModel, RoleName } from '@dnd-mapp/data';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../../../common';
import { RoleRepository } from '../../repositories';

@Injectable()
export class RoleService {
    constructor(
        private readonly userRoleRepository: RoleRepository,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(RoleService.name);
    }

    async findAll() {
        this.logger.log('Finding all Roles');
        return this.userRoleRepository.findAll();
    }

    async findById(id: number, throwsError = true) {
        this.logger.log('Finding a Role by ID');
        const byId = await this.userRoleRepository.findOneById(id);

        if (!byId && throwsError) {
            throw new NotFoundException(`Role with ID: '${id}' is not found`);
        }
        return byId;
    }

    async findByName(name: RoleName, throwsError = true) {
        this.logger.log('Finding a Role by name');
        const byName = await this.userRoleRepository.findOneByName(name);

        if (!byName && throwsError) {
            throw new NotFoundException(`Role with name: '${name}' is not found`);
        }
        return byName;
    }

    async update(role: RoleModel) {
        this.logger.log(`Updating a Role's data`);
        const byId = await this.findById(role.id, false);

        if (!byId) {
            throw new NotFoundException(`Cannot update Role with ID: '${role.id}' because it does not exist`);
        }
        const byName = await this.findByName(role.name, false);

        if (byName && byName.id !== role.id) {
            throw new BadRequestException(`Cannot update Role because the name '${byName.name}' is already used`);
        }
        return await this.userRoleRepository.save(role);
    }

    async create(role: CreateRoleData) {
        this.logger.log('Creating a new Role');
        const byName = await this.findByName(role.name, false);

        if (byName) {
            throw new BadRequestException(`Cannot create Role because the name '${byName.name}' is already used`);
        }
        return await this.userRoleRepository.save(role);
    }

    async remove(id: number) {
        this.logger.log('Removing a Role by ID');
        const byId = await this.findById(id, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove Role with ID: '${id}' because it does not exist`);
        }
        await this.userRoleRepository.deleteById(id);
    }
}
