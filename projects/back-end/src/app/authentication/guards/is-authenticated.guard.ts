import { TokenData, TokenType, UserModel } from '@dnd-mapp/data';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DmaSessionRequest, LoggerService } from '../../common';
import { TokenService, UserService } from '../services';

export type AuthenticatedRequest = DmaSessionRequest & { user?: UserModel; tokenType?: TokenType };

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
    protected readonly loggerContextName = IsAuthenticatedGuard.name;

    private request: AuthenticatedRequest;

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly loggerService: LoggerService
    ) {
        this.setLoggerContext();
    }

    async canActivate(context: ExecutionContext) {
        this.request = context.switchToHttp().getRequest<AuthenticatedRequest>();

        if (this.request.url.includes('token?grantType=authorizationCode')) return true;
        const encodedToken = this.validateAuthorizationHeader();
        const token = await this.getToken(encodedToken);

        this.request.user = await this.userService.findById(token.subject, false);
        this.request.tokenType = token.type;

        return Boolean(this.request.user);
    }

    protected async getToken(encodedToken: string) {
        let decodedToken: TokenData;

        try {
            decodedToken = await this.jwtService.verifyAsync(encodedToken);
        } catch (error) {
            this.loggerService.warn(`Invalid token in Authorization header for url ${this.request.url}`);
            throw new UnauthorizedException();
        }
        // Check if token belongs to current session, otherwise revoke tokens for both sessions
        if (this.request.dmaSession.id !== decodedToken.ses) {
            await this.tokenService.revokeTokensForUserSession(decodedToken.sub, decodedToken.ses);
            await this.tokenService.revokeTokensForUserSession(decodedToken.sub, this.request.dmaSession.id);

            this.loggerService.warn(`Token for other session used for url ${this.request.url}`);
            throw new UnauthorizedException();
        }
        // Check if token is active
        const storedToken = await this.tokenService.getByJti(decodedToken.jti);

        if (storedToken.revoked) {
            await this.tokenService.revokeTokensForUserSession(decodedToken.sub, decodedToken.ses);

            this.loggerService.warn(`Revoked token for session used for url ${this.request.url}`);
            throw new UnauthorizedException();
        }

        // Check if the token has expired
        if (Math.floor(Date.now() / 1000) >= decodedToken.exp) {
            this.loggerService.warn(`Expired token in Authorization header for url ${this.request.url}`);
            throw new UnauthorizedException('Token expired');
        }
        return storedToken;
    }

    private validateAuthorizationHeader() {
        const tokenHeader = this.request.headers['authorization'] as string;

        const token = tokenHeader.replace('Bearer ', '').trim();

        if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
            this.loggerService.warn(`Invalid Authorization header for url ${this.request.url}`);
            throw new UnauthorizedException('Invalid Authorization header');
        }
        if (!token) {
            this.loggerService.warn(`No token in Authorization header for url ${this.request.url}`);
            throw new UnauthorizedException('Missing access token');
        }
        return tokenHeader.replace('Bearer ', '').trim();
    }

    private setLoggerContext() {
        this.loggerService.setContext(this.loggerContextName);
    }
}
