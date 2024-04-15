import { SessionModel } from '@dnd-mapp/data';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { LoggerService } from '../../../common';
import { LoginRequest, SignUpRequest } from '../../models';
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

    async generateAuthorizationCode(session: SessionModel) {
        return await this.sessionService.generateAuthorizationCode(session);
    }

    async getTokensForSession(
        session: SessionModel,
        username: string,
        codeVerifier?: string,
        authorizationCode?: string
    ) {

        const user = await this.userService.findByUsername(username);

        return await this.tokenService.getEncodedTokensForUserSession(user.id, session.id);
    }

    async login(user: LoginRequest, session: SessionModel) {
        this.logger.log(`Authenticating User with username: ${user.username}`);
        const byUsername = await this.userService.findByUsername(user.username, false);

        if (!byUsername || !(await compare(user.password, byUsername.password))) {
            this.logger.warn(`Invalid username or password for User with username: ${user.username}`);
            throw new UnauthorizedException('Invalid username/password');
        }
        await this.tokenService.generateTokensForUser(byUsername, session);
    }

    async logout(userId: string, sessionId: string) {
        await this.tokenService.revokeTokensForUserSession(userId, sessionId);
    }

    async signup(user: SignUpRequest) {
        this.logger.log('Registering a new User');
        return await this.userService.create({ ...user, roles: [] });
    }

    async storeCodeChallenge(session: SessionModel, codeChallenge: string) {
        session.codeChallenge = codeChallenge;

        await this.sessionService.update(session);
    }
}
