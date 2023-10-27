import { CreateUserData } from '@dnd-mapp/data';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DndMappLoggerService } from '../common';
import { UserService } from '../entities/user';
import { LoginDto } from './models';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly logger: DndMappLoggerService
    ) {
        logger.setContext(AuthenticationService.name);
    }

    async login(user: LoginDto) {
        this.logger.log('Logging in a User');
        const byUsername = await this.userService.findByUsername(user.username, false);

        if (!byUsername || byUsername.password !== user.password) {
            throw new UnauthorizedException('Invalid username/password');
        }
        return { id: byUsername.id, username: byUsername.username };
    }

    async signup(user: CreateUserData) {
        this.logger.log('Signing up a new User');
        return await this.userService.create(user);
    }
}
