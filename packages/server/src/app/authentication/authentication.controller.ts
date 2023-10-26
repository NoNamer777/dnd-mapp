import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../entities/user';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './models';

@Controller({
    path: '/authentication',
})
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService) {}

    @Post('/login')
    async login(@Body() user: LoginDto) {
        return await this.authenticationService.login(user);
    }

    @Post('/sign-up')
    async signup(@Body() user: CreateUserDto) {
        return await this.authenticationService.signup(user);
    }
}
