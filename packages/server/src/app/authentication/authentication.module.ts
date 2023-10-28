import { Module } from '@nestjs/common';
import { LoggingModule } from '../common';
import { DndMappJwtModule } from '../config';
import { UserModule } from '../entities/user';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './services/authentication.service';

@Module({
    imports: [UserModule, LoggingModule, DndMappJwtModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule {}
