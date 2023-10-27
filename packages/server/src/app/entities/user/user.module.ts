import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { userRepositoryProvider } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), LoggingModule],
    providers: [UserService, userRepositoryProvider],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
