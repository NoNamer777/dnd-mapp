import { Global, Module } from '@nestjs/common';
import { DndMappJwtModule } from '../config';
import { AuthenticationController, RoleController, SessionController, UserController } from './controllers';
import { RoleRepository, SessionRepository, TokenRepository, UserRepository } from './repositories';
import {
    AuthenticationService,
    RoleService,
    SessionService,
    TokenService,
    UserService,
    maxTokensProvider,
} from './services';

@Global()
@Module({
    imports: [DndMappJwtModule],
    controllers: [AuthenticationController, UserController, RoleController, SessionController],
    providers: [
        AuthenticationService,
        RoleService,
        RoleRepository,
        UserService,
        UserRepository,
        TokenService,
        TokenRepository,
        maxTokensProvider,
        SessionService,
        SessionRepository,
    ],
    exports: [AuthenticationService, SessionService, UserService, TokenService],
})
export class AuthenticationModule {}
