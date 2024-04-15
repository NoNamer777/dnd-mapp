import { BeforeApplicationShutdown, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../../common';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, BeforeApplicationShutdown {
    constructor(private readonly loggerService: LoggerService) {
        super();
    }

    async onModuleInit() {
        try {
            await this.$connect();
        } catch (error) {
            this.loggerService.error('An error has occurred while setting up the database connection: ', error);
        }
    }

    async beforeApplicationShutdown(signal: string) {
        await this.$disconnect();
    }
}
