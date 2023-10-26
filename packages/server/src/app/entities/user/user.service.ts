import { User } from '@dnd-mapp/data';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: UserRepository) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findById(userId: number, throwsError = true): Promise<User> {
        const byId = await this.userRepository.findOneById(userId);

        if (!byId && throwsError) {
            throw new NotFoundException(`User with ID: '${userId}' is not found`);
        }
        return byId;
    }

    async findByUsername(username: string, throwsError = true): Promise<User> {
        const byUsername = await this.userRepository.findOneByUsername(username);

        if (!byUsername && throwsError) {
            throw new NotFoundException(`User with name: '${username}' is not found`);
        }
        return byUsername;
    }

    async update(user: User): Promise<User> {
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

    async create(user: CreateUserDto): Promise<User> {
        const byUsername = await this.findByUsername(user.username, false);

        if (byUsername) {
            throw new BadRequestException(
                `Cannot create User because the name '${byUsername.username}' is already used`
            );
        }
        return await this.userRepository.save(user);
    }

    async remove(userId: number): Promise<void> {
        const byId = await this.findById(userId, false);

        if (!byId) {
            throw new NotFoundException(`Could not remove User with ID: '${userId}' because it does not exist`);
        }
        await this.userRepository.deleteById(userId);
    }
}
