import { UserRoles } from '@dnd-mapp/data';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../services';
import { getAuthenticatedUser, hasRole } from './methods';

@Injectable()
export class IsOwnerOrAdminGuard implements CanActivate {
    private readonly userService: UserService;

    constructor(
        private readonly jwtService: JwtService,
        private readonly moduleRef: ModuleRef
    ) {
        this.userService = this.moduleRef.get(UserService);
    }

    async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const requestPath = request.path.match(/\/[1-9]+/);

        const authenticatedUser = await getAuthenticatedUser(context, this.jwtService, this.userService);

        if (!requestPath) {
            return hasRole(authenticatedUser, UserRoles.ADMIN);
        }
        return (
            hasRole(authenticatedUser, UserRoles.ADMIN) || Number(requestPath[0].substring(1)) === authenticatedUser.id
        );
    }
}
