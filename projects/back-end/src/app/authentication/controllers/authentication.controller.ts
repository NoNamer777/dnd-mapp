import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LoggerService, buildServerUrl } from '../../common';
import { ServerConfig } from '../../config';
import {
    AuthorizationCodeResponse,
    CodeChallengeRequest,
    LoginDto,
    SignUpDto,
    StateRequest,
    StateResponse,
} from '../models';
import { AuthenticationService } from '../services';

@Controller({ path: '/authentication' })
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly logger: LoggerService,
        private readonly configService: ConfigService
    ) {
        logger.setContext(AuthenticationController.name);
    }

    @Post('/authorize')
    async authorize(@Body() requestBody: StateRequest, @Req() request: Request): Promise<AuthorizationCodeResponse> {
        const clientId = request.header('Dma-Client-Id');

        this.logger.log(`Received request to generate authorization code for Client with ID: '${clientId}'`);

        const authorizationCode = await this.authenticationService.generateAuthorizationCode(clientId);

        return { state: requestBody.state, authorizationCode: authorizationCode };
    }

    @Post('/challenge')
    async codeChallenge(@Body() requestBody: CodeChallengeRequest, @Req() request: Request): Promise<StateResponse> {
        const { codeChallenge, state } = requestBody;
        const clientId = request.header('Dma-Client-Id');

        this.logger.log(`Received request to persist code challenge for Client with ID: '${clientId}'`);

        await this.authenticationService.storeClientChallenge(clientId, codeChallenge);

        return {
            state: state,
        };
    }

    @Post('/login')
    async login(@Body() user: LoginDto) {
        this.logger.log(`Received a request to authenticate User with username: '${user.username}'`);

        await this.authenticationService.login(user);
    }

    @Post('/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(ClassSerializerInterceptor)
    async signup(@Body() userData: SignUpDto, @Res({ passthrough: true }) response: Response) {
        this.logger.log('Received a request to register a new User');

        const user = await this.authenticationService.signup(userData);
        const { host, port, address, useSsl } = this.configService.get<ServerConfig>('server');

        response.header('Location', `${buildServerUrl(host, port, useSsl, address)}/server/api/user/${user.id}`);

        return user;
    }
}
