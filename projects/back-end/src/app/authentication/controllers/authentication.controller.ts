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
import { Response } from 'express';
import { DmaClientRequest, LoggerService, backEndServerAddress } from '../../common';
import {
    AuthorizationCodeResponse,
    CodeChallengeRequest,
    LoginRequest,
    SignUpRequest,
    StateRequest,
    StateResponse,
} from '../models';
import { AuthenticationService } from '../services';

@Controller({ path: '/authentication' })
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(AuthenticationController.name);
    }

    @Post('/authorize')
    async authorize(
        @Body() requestBody: StateRequest,
        @Req() request: DmaClientRequest
    ): Promise<AuthorizationCodeResponse> {
        this.logger.log(
            `Received request to generate authorization code for Client with ID: '${request.dmaClient?.id}'`
        );

        const authorizationCode = await this.authenticationService.generateAuthorizationCode(request.dmaClient?.id);

        return { state: requestBody.state, authorizationCode: authorizationCode };
    }

    @Post('/challenge')
    async codeChallenge(
        @Body() requestBody: CodeChallengeRequest,
        @Req() request: DmaClientRequest
    ): Promise<StateResponse> {
        const { codeChallenge, state } = requestBody;

        this.logger.log(`Received request to persist code challenge for Client with ID: '${request.dmaClient?.id}'`);

        await this.authenticationService.storeClientChallenge(request.dmaClient?.id, codeChallenge);

        return {
            state: state,
        };
    }

    @Post('/login')
    async login(@Body() user: LoginRequest, @Req() request: DmaClientRequest) {
        this.logger.log(`Received a request to authenticate User with username: '${user.username}'`);

        await this.authenticationService.login(user, request.dmaClient);
    }

    @Post('/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(ClassSerializerInterceptor)
    async signup(@Body() userData: SignUpRequest, @Res({ passthrough: true }) response: Response) {
        this.logger.log('Received a request to register a new User');

        const user = await this.authenticationService.signup(userData);

        response.header('Location', `${backEndServerAddress}/server/api/user/${user.id}`);

        return user;
    }
}
