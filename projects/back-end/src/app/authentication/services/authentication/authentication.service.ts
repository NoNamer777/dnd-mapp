import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { LoggerService } from '../../../common';
import { BackEndSession } from '../../entities';
import { LoginRequest } from '../../models';
import { SessionService } from '../session';
import { TokenService } from '../token';
import { UserService } from '../user';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly sessionService: SessionService,
        private readonly tokenService: TokenService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(AuthenticationService.name);
    }

    async getTokensForSession(
        session: BackEndSession,
        username: string,
        codeVerifier?: string,
        authorizationCode?: string
    ) {
        const user = await this.userService.findByUsername(username);

        if (codeVerifier && authorizationCode) {
            await this.sessionService.verifyCodeChallenge(session, codeVerifier);
            await this.sessionService.verifyAuthorizationCode(session, authorizationCode);
        }
        await this.tokenService.generateTokensForUser(user.id, session);

        return await this.tokenService.getEncodedTokensForUserSession(user.id, session.id);
    }

    async login(user: LoginRequest) {
        this.logger.log(`Authenticating User with username: ${user.username}`);
        const byUsername = await this.userService.findByUsername(user.username, false);

        if (!byUsername || !(await compare(user.password, byUsername.password))) {
            this.logger.warn(`Invalid username or password for User with username: ${user.username}`);
            throw new BadRequestException('Invalid username/password');
        }
    }
}
