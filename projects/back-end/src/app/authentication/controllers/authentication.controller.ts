import { TokenType, TokenTypes } from '@dnd-mapp/data';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { DmaSessionRequest, LoggerService, backEndServerAddress } from '../../common';
import { AuthenticatedRequest, HasSessionGuard, IsAuthenticatedGuard } from '../guards';
import {
    AuthorizationCodeResponse,
    CodeChallengeRequest,
    LoginRequest,
    SignUpRequest,
    StateRequest,
    StateResponse,
    TokenQueryParams,
    TokenRequest,
} from '../models';
import { AuthenticationService, TokenService } from '../services';

@Throttle({ default: { limit: 15, ttl: 60_000 } })
@UseGuards(HasSessionGuard)
@Controller({ path: '/authentication' })
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly tokenService: TokenService,
        private readonly logger: LoggerService
    ) {
        logger.setContext(AuthenticationController.name);
    }

    @Post('/authorize')
    async authorize(
        @Body() requestBody: StateRequest,
        @Req() request: DmaSessionRequest
    ): Promise<AuthorizationCodeResponse> {
        this.logger.log(`Received request to generate authorization code for Session: '${request.dmaSession.id}'`);
        const authorizationCode = await this.authenticationService.generateAuthorizationCode(request.dmaSession);

        return { state: requestBody.state, data: { authorizationCode } };
    }

    @Post('/challenge')
    async codeChallenge(
        @Body() requestBody: CodeChallengeRequest,
        @Req() request: DmaSessionRequest
    ): Promise<StateResponse> {
        this.logger.log(`Received request to persist code challenge for Session: '${request.dmaSession.id}'`);
        const { codeChallenge, state } = requestBody;

        await this.authenticationService.storeCodeChallenge(request.dmaSession, codeChallenge);

        return {
            state: state,
        };
    }

    @Post('/login')
    async login(@Body() user: LoginRequest, @Req() request: DmaSessionRequest) {
        this.logger.log(`Received a request to authenticate User with username: '${user.username}'`);
        await this.authenticationService.login(user, request.dmaSession);
    }

    @UseGuards(IsAuthenticatedGuard)
    @Post('/sign-out')
    async logout(@Req() request: AuthenticatedRequest) {
        this.logger.log('Receiving a request to log out a User');
        await this.authenticationService.logout(request.user.id, request.dmaSession.id);
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

    @UseGuards(IsAuthenticatedGuard)
    @Post('/token')
    async token(
        @Query() queryParams: TokenQueryParams,
        @Req() request: DmaSessionRequest,
        @Body() requestBody?: TokenRequest
    ) {
        this.logger.log(`Received request for JWT tokens for Session ${request.dmaSession.id}`);
        const { authorizationCode, codeVerifier } = requestBody;
        const { grantType } = queryParams;

        let tokens: Record<TokenType, string>;

        if (grantType === 'authorizationCode') {
            tokens = await this.authenticationService.getTokensForSession(
                request.dmaSession,
                requestBody.username,
                codeVerifier,
                authorizationCode
            );
        } else if (grantType === 'refreshToken') {
            const user = (request as AuthenticatedRequest).user;

            await this.tokenService.generateTokensForUser(user, request.dmaSession);

            tokens = await this.authenticationService.getTokensForSession(request.dmaSession, user.username);
        }

        return {
            [TokenTypes.ACCESS.toLowerCase()]: tokens[TokenTypes.ACCESS],
            [TokenTypes.REFRESH.toLowerCase()]: tokens[TokenTypes.REFRESH],
        };
    }
}
