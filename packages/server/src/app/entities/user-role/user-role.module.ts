import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common/logging/logging.module';
import { UserRoleController } from './user-role.controller';
import { UserRoleEntity } from './user-role.entity';
import { userRoleRepositoryProvider } from './user-role.repository';
import { UserRoleService } from './user-role.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRoleEntity]), LoggingModule],
    providers: [UserRoleService, userRoleRepositoryProvider],
    controllers: [UserRoleController],
})
export class UserRoleModule {}
