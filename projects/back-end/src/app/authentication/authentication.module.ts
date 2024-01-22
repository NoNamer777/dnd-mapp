import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DndMappJwtModule } from '../config';
import { AuthenticationController, ClientController, RoleController, UserController } from './controllers';
import { ClientEntity, RoleEntity, TokenEntity, UserEntity } from './entities';
import { ClientRepository, RoleRepository, UserRepository } from './repositories';
import { AuthenticationService, ClientService, RoleService, UserService } from './services';

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
    ],
    exports: [AuthenticationService],
})
export class AuthenticationModule {}
