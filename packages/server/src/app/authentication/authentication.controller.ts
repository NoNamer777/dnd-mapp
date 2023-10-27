import { DndMappLoggerService } from '../common';
import { AbilityController } from '../entities/ability/ability.controller';
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../entities/user';
import { LoginDto } from './models';
import { AuthenticationService } from './services/authentication.service';

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
    @HttpCode(HttpStatus.OK)
    async login(@Body() user: LoginDto, @Res({ passthrough: true }) response: Response) {
        this.logger.log('Received a request to log in a User');

        const token = await this.authenticationService.login(user);

        response.header('Authorization', `Bearer ${token}`);
    }

    @Post('/sign-up')
    async signup(@Body() user: CreateUserDto) {
        this.logger.log('Received a request to sign up a User');
        return await this.authenticationService.signup(user);
    }
}
