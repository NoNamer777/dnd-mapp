import { CreateUserData } from '@dnd-mapp/data';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../entities/user';
import { LoginDto } from './models';

@Injectable()
export class AuthenticationService {
    constructor(private userService: UserService) {}

    async login(user: LoginDto) {
        const byUsername = await this.userService.findByUsername(user.username, false);

        if (!byUsername && byUsername?.password !== user.password) {
            throw new UnauthorizedException('Invalid username/password');
        }
        return { id: byUsername.id, username: byUsername.username };
    }

    async signup(user: CreateUserData) {
        return await this.userService.create(user);
    }
}
