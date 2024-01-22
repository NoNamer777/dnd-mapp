import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services';
import { getAuthenticatedUser } from './methods';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext) {
        return Boolean(await getAuthenticatedUser(context, this.jwtService, this.userService));
    }
}
