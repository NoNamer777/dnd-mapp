import { RoleName, UserModel } from '@dnd-mapp/data';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DmaClientRequest } from '../../common';
import { UserService } from '../services';

export type AuthenticatedRequest = DmaClientRequest & { authenticatedUser?: UserModel };

export async function getAuthenticatedUser(
    context: ExecutionContext,
    jwtService: JwtService,
    userService: UserService
) {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
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
    const user = await userService.findById(decodedToken.sub);

    request.authenticatedUser = user;

    return user;
}

export function hasRole(user: UserModel, role: RoleName) {
    return user.hasRole(role);
}
