import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configServer = app.get(ConfigService);

    const { host, port } = {
        host: configServer.get('host'),
        port: configServer.get('port'),
    };

    await app.listen(port, host);

    Logger.log(`Application is running on: http://${host}:${port}/`);
}

bootstrap();
