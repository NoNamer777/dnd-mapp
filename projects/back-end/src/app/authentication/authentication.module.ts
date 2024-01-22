import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DndMappJwtModule } from '../config';
import { AuthenticationController, ClientController, RoleController, UserController } from './controllers';
import { ClientEntity, RoleEntity, TokenEntity, UserEntity } from './entities';
import { ClientRepository, RoleRepository, UserRepository } from './repositories';
import { TokenRepository } from './repositories/token.repository';
import {
    AuthenticationService,
    ClientService,
    RoleService,
    TokenService,
    UserService,
    maxTokensProvider,
} from './services';

@Module({
    imports: [DndMappJwtModule, TypeOrmModule.forFeature([ClientEntity, UserEntity, RoleEntity, TokenEntity])],
    controllers: [AuthenticationController, UserController, RoleController, ClientController],
    providers: [
        AuthenticationService,
        UserService,
        UserRepository,
        RoleService,
        RoleRepository,
        ClientService,
        ClientRepository,
        TokenService,
        TokenRepository,
        maxTokensProvider,
    ],
    exports: [AuthenticationService, ClientService],
})
export class AuthenticationModule {}
