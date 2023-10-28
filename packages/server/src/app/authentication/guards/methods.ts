import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../../entities/user';

export async function getAuthenticatedUser(
    context: ExecutionContext,
    jwtService: JwtService,
    userService: UserService
) {
    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader = request.header('Authorization');

    if (!authorizationHeader) {
        // Missing Authorization header
        throw new UnauthorizedException();
    }
    const token = authorizationHeader.replace('Bearer ', '').trim();

    if (!token) {
        // Missing JWT token
        throw new UnauthorizedException();
    }
    let decodedToken: { sub: number };

    try {
        decodedToken = await jwtService.verifyAsync(token);
    } catch (error) {
        // JWT decoding error, token expired error
        throw new UnauthorizedException();
    }
    return await userService.findById(decodedToken.sub);
}
