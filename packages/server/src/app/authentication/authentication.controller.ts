import { Body, Controller, Post } from '@nestjs/common';
import { DndMappLoggerService } from '../common';
import { AbilityController } from '../entities/ability/ability.controller';
import { CreateUserDto } from '../entities/user';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './models';

@Controller({
    path: '/authentication',
})
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly logger: DndMappLoggerService
    ) {
        logger.setContext(AbilityController.name);
    }

    @Post('/login')
    async login(@Body() user: LoginDto) {
        this.logger.log('Received a request to log in a User');
        return await this.authenticationService.login(user);
    }

    @Post('/sign-up')
    async signup(@Body() user: CreateUserDto) {
        this.logger.log('Received a request to sign up a User');
        return await this.authenticationService.signup(user);
    }
}
