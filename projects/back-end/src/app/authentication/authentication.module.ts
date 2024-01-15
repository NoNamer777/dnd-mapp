import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../common';
import { DndMappJwtModule } from '../config';
import { AuthenticationController, ClientController, RoleController, UserController } from './controllers';
import { ClientEntity, RoleEntity, UserEntity } from './entities';
import { ClientRepository, RoleRepository, UserRepository } from './repositories';
import { AuthenticationService, ClientService, RoleService, UserService } from './services';

@Module({
    imports: [LoggingModule, DndMappJwtModule, TypeOrmModule.forFeature([ClientEntity, UserEntity, RoleEntity])],
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
