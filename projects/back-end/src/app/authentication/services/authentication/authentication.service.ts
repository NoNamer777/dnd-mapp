import { ClientModel } from '@dnd-mapp/data';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { LoggerService } from '../../../common';
import { LoginRequest, SignUpRequest } from '../../models';
import { ClientService } from '../client';
import { TokenService } from '../token';
import { UserService } from '../user';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly clientService: ClientService,
        private readonly tokenService: TokenService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(AuthenticationService.name);
    }

    async generateAuthorizationCode(clientId: string) {
        return await this.clientService.generateAuthorizationCodeForClient(clientId);
    }

    async getTokensForClient(client: ClientModel, codeVerifier: string, authorizationCode: string, username: string) {
        await this.clientService.verifyCodeChallengeForClient(client, codeVerifier);
        await this.clientService.verifyAuthorizationCode(client, authorizationCode);

        // Reset the authorization for a Client once everything has been validated
        await this.clientService.resetClientAuthorization(client);

        const user = await this.userService.findByUsername(username);

        return await this.tokenService.getEncodedTokensUserOnForClient(user, client);
    }

    // TODO: Add maximum of 3 attempts within 5 minutes, otherwise timeout for 10 minutes
    async login(user: LoginRequest, client: ClientModel) {
        this.logger.log(`Authenticating User with username: ${user.username}`);
        const byUsername = await this.userService.findByUsername(user.username, false);

        if (!byUsername || !(await compare(user.password, byUsername.password))) {
            this.logger.warn(`Invalid username or password for User with username: ${user.username}`);
            throw new UnauthorizedException('Invalid username/password');
        }
        await this.tokenService.generateTokensForUser(byUsername, client);
    }

    async signup(user: SignUpRequest) {
        this.logger.log('Registering a new User');
        return await this.userService.create(user);
    }

    async storeClientChallenge(clientId: string, codeChallenge: string) {
        const client = await this.clientService.findById(clientId);

        client.codeChallenge = codeChallenge;

        await this.clientService.update(client);
    }
}
