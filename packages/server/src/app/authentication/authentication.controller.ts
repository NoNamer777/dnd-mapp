import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { DndMappLoggerService, buildServerUrl } from '../common';
import { LoginDto, SignUpDto } from './models';
import { AuthenticationService } from './services/authentication.service';

@Controller({ path: '/authentication' })
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly logger: DndMappLoggerService,
        private readonly configService: ConfigService
    ) {
        logger.setContext(AuthenticationController.name);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() user: LoginDto, @Res({ passthrough: true }) response: Response) {
        this.logger.log('Received a request to log in a User');

        const token = await this.authenticationService.login(user);

        response.header('Authorization', `Bearer ${token}`);
    }

    @Post('/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(ClassSerializerInterceptor)
    async signup(@Body() userData: SignUpDto, @Res({ passthrough: true }) response: Response) {
        this.logger.log('Received a request to sign up a User');

        const user = await this.authenticationService.signup(userData);

        response.header('Location', `${buildServerUrl(this.configService)}server/api/user/${user.id}`);

        // TODO: Don't send sensitive User data
        return user;
    }
}
