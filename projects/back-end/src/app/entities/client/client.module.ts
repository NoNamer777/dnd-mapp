import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from '../../common';
import { ClientController } from './client.controller';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

@Module({
    imports: [TypeOrmModule.forFeature([ClientEntity]), LoggingModule],
    controllers: [ClientController],
    providers: [ClientService, ClientRepository],
    exports: [ClientService],
})
export class ClientModule {}
