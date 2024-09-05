import { TokenTypes } from '@dnd-mapp/data';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { DmaClientRequest, LoggerService, backEndServerAddress } from '../../common';
import { IsAuthenticatedGuard } from '../guards';
import { AuthenticatedRequest } from '../guards/methods';
import {
    AuthorizationCodeResponse,
    CodeChallengeRequest,
    LoginRequest,
    SignUpRequest,
    StateRequest,
    StateResponse,
    TokenRequest,
} from '../models';
import { AuthenticationService } from '../services';

@Throttle({ default: { limit: 15, ttl: 60_000 } })
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

    @UseGuards(IsAuthenticatedGuard)
    @Post('/sign-out')
    async logout(@Req() request: AuthenticatedRequest, @Res({ passthrough: true }) response: Response) {
        this.logger.log('Receiving a request to log out a User');

        await this.authenticationService.logout(request.authenticatedUser, request.dmaClient);

        response.clearCookie('access-token');
        response.clearCookie('refresh-token');
        response.clearCookie('identity-token');
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

    @Post('/token')
    async token(
        @Body() requestBody: TokenRequest,
        @Req() request: DmaClientRequest,
        @Res({ passthrough: true }) response: Response
    ) {
        this.logger.log(`Received request for JWT tokens for Client with ID: '${request.dmaClient?.id}'`);
        const { authorizationCode, codeVerifier, username } = requestBody;

        const tokens = await this.authenticationService.getTokensForClient(
            request.dmaClient,
            codeVerifier,
            authorizationCode,
            username
        );

        this.setResponseCookies(tokens, response);
    }

    private setResponseCookies(tokens: Map<TokenTypes, { token: string; expiresAt: Date }>, response: Response) {
        tokens.forEach((data, type) =>
            response.cookie(`${type.toLowerCase()}-token`, data.token, {
                secure: true,
                signed: type !== TokenTypes.IDENTITY,
                httpOnly: type !== TokenTypes.IDENTITY,
                sameSite: 'strict',
                expires: data.expiresAt,
            })
        );
    }
}
