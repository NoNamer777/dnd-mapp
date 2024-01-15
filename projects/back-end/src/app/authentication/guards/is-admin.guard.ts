import { UserRoles } from '@dnd-mapp/data';
import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services';
import { getAuthenticatedUser, hasRole } from './methods';

@Injectable()
export class IsAdminGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext) {
        return hasRole(await getAuthenticatedUser(context, this.jwtService, this.userService), UserRoles.ADMIN);
    }
}
