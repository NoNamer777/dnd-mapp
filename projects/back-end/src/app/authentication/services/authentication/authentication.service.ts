import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { DndMappLoggerService } from '../../../common';
import { LoginDto, SignUpDto } from '../../models';
import { UserService } from '../user';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly logger: DndMappLoggerService,
        private readonly jwtService: JwtService
    ) {
        logger.setContext(AuthenticationService.name);
    }

    async login(user: LoginDto) {
        this.logger.log('Logging in a User');
        const byUsername = await this.userService.findByUsername(user.username, false);

        if (!byUsername || !(await compare(user.password, byUsername.password))) {
            throw new UnauthorizedException('Invalid username/password');
        }
        return await this.jwtService.signAsync({ sub: byUsername.id });
    }

    async signup(user: SignUpDto) {
        this.logger.log('Signing up a new User');
        return await this.userService.create(user);
    }
}