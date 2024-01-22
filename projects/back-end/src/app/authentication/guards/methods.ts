import { RoleName, UserModel } from '@dnd-mapp/data';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../services';

export async function getAuthenticatedUser(
    context: ExecutionContext,
    jwtService: JwtService,
    userService: UserService
) {
    const request: Request = context.switchToHttp().getRequest();
    const accessTokenCookie = request.signedCookies['access-token'];

    if (!accessTokenCookie) {
        // Missing Access token cookie
        throw new UnauthorizedException();
    }

    let decodedToken: { sub: number };

    try {
        decodedToken = await jwtService.verifyAsync(accessTokenCookie);
    } catch (error) {
        // JWT decoding error, token expired error
        throw new UnauthorizedException();
    }
    return await userService.findById(decodedToken.sub);
}

export function hasRole(user: UserModel, role: RoleName) {
    return user.hasRole(role);
}
