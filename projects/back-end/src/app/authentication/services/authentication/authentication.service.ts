import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { LoggerService } from '../../../common';
import { LoginDto, SignUpDto } from '../../models';
import { ClientService } from '../client';
import { UserService } from '../user';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly clientService: ClientService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(AuthenticationService.name);
    }

    async generateAuthorizationCode(clientId: string) {
        return await this.clientService.generateAuthorizationCodeForClient(clientId);
    }

    // TODO: Add maximum of 3 attempts within 5 minutes, otherwise timeout for 10 minutes
    async login(user: LoginDto) {
        this.logger.log(`Authenticating User with username: ${user.username}`);
        const byUsername = await this.userService.findByUsername(user.username, false);

        if (!byUsername || !(await compare(user.password, byUsername.password))) {
            this.logger.warn(`Invalid username or password for User with username: ${user.username}`);
            throw new UnauthorizedException('Invalid username/password');
        }
    }

    async signup(user: SignUpDto) {
        this.logger.log('Registering a new User');
        return await this.userService.create(user);
    }

    async storeClientChallenge(clientId: string, codeChallenge: string) {
        const client = await this.clientService.findById(clientId);

        client.codeChallenge = codeChallenge;

        await this.clientService.update(client);
    }
}
