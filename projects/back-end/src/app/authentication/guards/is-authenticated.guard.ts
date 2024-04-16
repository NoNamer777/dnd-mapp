import { TokenData, UserModel } from '@dnd-mapp/data';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DmaSessionRequest, LoggerService } from '../../common';
import { TokenService, UserService } from '../services';

export type AuthenticatedRequest = DmaSessionRequest & { user?: UserModel };

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
    protected readonly loggerContextName = IsAuthenticatedGuard.name;

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly loggerService: LoggerService
    ) {
        this.setLoggerContext();
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

        if (request.url.includes('token?grantType=authorizationCode')) return true;
        const token = await this.getToken(context);

        request.user = await this.userService.findById(token.sub, false);

        return Boolean(request.user);
    }

    protected async getToken(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const tokenHeader = request.headers['authorization'] as string;

        const token = tokenHeader.replace('Bearer ', '').trim();

        if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
            this.loggerService.warn(`Invalid Authorization header for url ${request.url}`);
            throw new UnauthorizedException('Invalid Authorization header');
        }
        if (!token) {
            this.loggerService.warn(`No token in Authorization header for url ${request.url}`);
            throw new UnauthorizedException('Missing access token');
        }
        let decodedToken: TokenData;

        try {
            decodedToken = await this.jwtService.verifyAsync(token);
        } catch (error) {
            this.loggerService.warn(`Invalid token in Authorization header for url ${request.url}`);
            throw new UnauthorizedException();
        }
        // Check if token belongs to current session, otherwise revoke tokens for both sessions
        if (request.dmaSession.id !== decodedToken.ses) {
            await this.tokenService.revokeTokensForUserSession(decodedToken.sub, decodedToken.ses);
            await this.tokenService.revokeTokensForUserSession(decodedToken.sub, request.dmaSession.id);

            this.loggerService.warn(`Token for other session used for url ${request.url}`);
            throw new UnauthorizedException();
        }
        // Check if token is active
        const storedToken = await this.tokenService.getByJti(decodedToken.jti);

        if (storedToken.revoked) {
            await this.tokenService.revokeTokensForUserSession(decodedToken.sub, decodedToken.ses);

            this.loggerService.warn(`Revoked token for session used for url ${request.url}`);
            throw new UnauthorizedException();
        }

        // Check if the token has expired
        if (Math.floor(Date.now() / 1000) >= decodedToken.exp) {
            this.loggerService.warn(`Expired token in Authorization header for url ${request.url}`);
            throw new UnauthorizedException('Token expired');
        }
        return decodedToken;
    }

    private setLoggerContext() {
        this.loggerService.setContext(this.loggerContextName);
    }
}
