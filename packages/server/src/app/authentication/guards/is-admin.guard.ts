import { UserRoles } from '@dnd-mapp/data';
import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../entities/user';
import { getAuthenticatedUser } from './methods';

@Injectable()
export class IsAdminGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext) {
        const authenticatedUser = await getAuthenticatedUser(context, this.jwtService, this.userService);

        return authenticatedUser.hasRole(UserRoles.ADMIN);
    }
}
