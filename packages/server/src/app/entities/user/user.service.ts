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

    async findByName(username: string, throwsError = true): Promise<User> {
        const byName = await this.userRepository.findOneByUsername(username);

        if (!byName && throwsError) {
            throw new NotFoundException(`User with name: '${username}' is not found`);
        }
        return byName;
    }

    async update(user: User): Promise<User> {
        const byId = await this.findById(user.id, false);
        const byName = await this.findByName(user.username, false);

        if (!byId) {
            throw new NotFoundException(`Cannot update User with ID: '${user.id}' because it does not exist`);
        }
        if (byName && byName.id !== user.id) {
            throw new BadRequestException(`Cannot update User because the name '${byName.username}' is already used`);
        }
        return await this.userRepository.save(user);
    }

    async create(user: CreateUserDto): Promise<User> {
        const byName = await this.findByName(user.username, false);

        if (byName) {
            throw new BadRequestException(`Cannot create User because the name '${byName.username}' is already used`);
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
