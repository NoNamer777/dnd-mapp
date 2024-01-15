import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { DndMappJwtModule } from '../../config';
import { UserModule } from '../user';
import { UserRoleController } from './user-role.controller';
import { UserRoleEntity } from './user-role.entity';
import { UserRoleRepository } from './user-role.repository';
import { UserRoleService } from './user-role.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRoleEntity]),
        LoggingModule,
        DndMappJwtModule,
        forwardRef(() => UserModule),
    ],
    providers: [UserRoleService, UserRoleRepository],
    controllers: [UserRoleController],
    exports: [UserRoleService],
})
export class UserRoleModule {}
