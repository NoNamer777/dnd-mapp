import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DndMappLoggerService } from '../../common';
import { CreateUserDto, UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: UserRepository,
        private logger: DndMappLoggerService
    ) {
        logger.setContext(UserService.name);
    }

    async findAll() {
        this.logger.log('Finding all Users');
        return this.userRepository.findAll();
    }

    async findById(userId: number, throwsError = true) {
        this.logger.log('Finding a User by ID');
        const byId = await this.userRepository.findOneById(userId);

        if (!byId && throwsError) {
            throw new NotFoundException(`User with ID: '${userId}' is not found`);
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

    async update(user: UserEntity) {
        this.logger.log(`Updating a User's data`);
        const byId = await this.findById(user.id, false);
        const byUsername = await this.findByUsername(user.username, false);

        if (!byId) {
            throw new NotFoundException(`Cannot update User with ID: '${user.id}' because it does not exist`);
        }
        if (byUsername && byUsername.id !== user.id) {
            throw new BadRequestException(
                `Cannot update User because the name '${byUsername.username}' is already used`
            );
        }
        return await this.userRepository.save(user);
    }

    async create(user: CreateUserDto) {
        this.logger.log('Creating a new User');
        const byUsername = await this.findByUsername(user.username, false);

        if (byUsername) {
            throw new BadRequestException(
                `Cannot create User because the name '${byUsername.username}' is already used`
            );
        }
        return await this.userRepository.save(user);
    }

    async remove(userId: number) {
        this.logger.log('Removing a User by ID');
        const byId = await this.findById(userId, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove User with ID: '${userId}' because it does not exist`);
        }
        await this.userRepository.deleteById(userId);
    }
}
