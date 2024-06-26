import { Roles, UserModel } from '@dnd-mapp/data';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { LoggerService } from '../../../common';
import { CreateUserData, UpdateUserData } from '../../entities';
import { UserRepository } from '../../repositories';
import { RoleService } from '../role';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userRoleService: RoleService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(UserService.name);
    }

    async findAll() {
        this.logger.log('Finding all Users');
        return this.userRepository.findAll();
    }

    async findById(id: number, throwsError = true) {
        this.logger.log('Finding a User by ID');
        const byId = await this.userRepository.findOneById(id);

        if (!byId && throwsError) {
            throw new NotFoundException(`User with ID: '${id}' is not found`);
        }
        return byId;
    }

    async findByUsername(username: string, throwsError = true) {
        this.logger.log('Finding a User by username');
        const byUsername = await this.userRepository.findOneByUsername(username);

        if (!byUsername && throwsError) {
            throw new NotFoundException(`User with name: '${username}' is not found`);
        }
        return byUsername;
    }

    async update(user: UpdateUserData) {
        this.logger.log(`Updating a User's data`);
        const byId = await this.findById(user.id, false);
        const byUsername = await this.findByUsername(user.username, false);

        if (!byId) {
            throw new NotFoundException(`Cannot update User with ID: '${user.id}' because it does not exist`);
        }
        if (byUsername && byUsername.id !== user.id) {
            throw new BadRequestException(
                `Cannot update User because the username '${byUsername.username}' is already used`
            );
        }
        user.password = await this.resolvePassword(user.password, byId.password);
        await this.userRepository.save(user);

        return await this.userRepository.findOneById(user.id);
    }

    async create(user: CreateUserData) {
        this.logger.log('Creating a new User');
        const byUsername = await this.findByUsername(user.username, false);

        if (byUsername) {
            throw new BadRequestException(
                `Cannot create User because the username '${byUsername.username}' is already used`
            );
        }
        (user as UserModel).roles = [await this.userRoleService.findByName(Roles.PLAYER)];
        user.password = await this.hashPassword(user.password);

        await this.userRepository.save(user);

        return await this.userRepository.findOneByUsername(user.username);
    }

    async remove(id: number) {
        this.logger.log('Removing a User by ID');
        const byId = await this.findById(id, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove User with ID: '${id}' because it does not exist`);
        }
        await this.userRepository.deleteById(id);
    }

    private async hashPassword(plainTextPassword: string) {
        return hash(plainTextPassword, await genSalt(12));
    }

    private async resolvePassword(newPassword: string, oldPassword: string) {
        return oldPassword === newPassword ? oldPassword : await this.hashPassword(newPassword);
    }
}
