import { HttpStatus, Logger, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { readFile } from 'fs/promises';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import { AppModule } from './app/app.module';
import { LoggerService, backEndServerAddress, buildServerUrl } from './app/common';
import { ServerConfig, corsConfig } from './app/config';

const validationOptions: ValidationPipeOptions = {
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    forbidNonWhitelisted: true,
    stopAtFirstError: true,
    transform: true,
    transformOptions: {
        enableCircularCheck: true,
        enableImplicitConversion: true,
    },
    whitelist: true,
};

async function bootstrap() {
    const expressServer = express();

    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressServer), { bufferLogs: true });
    const configService = nestApp.get(ConfigService);

    const logger = await nestApp.resolve(LoggerService);
    logger.setContext('NestApplication');
    Logger.flush();

    const { host, port, address, useSsl, ssl } = configService.get<ServerConfig>('server');
    buildServerUrl(host, port, useSsl, address);

    nestApp.useLogger(logger);

    nestApp.setGlobalPrefix('/server', { exclude: [''] });

    nestApp.useGlobalPipes(new ValidationPipe(validationOptions));

    nestApp.enableCors(corsConfig(backEndServerAddress));

    const server = ssl
        ? createHttpsServer({ cert: await readFile(ssl.certPath), key: await readFile(ssl.keyPath) }, expressServer)
        : createHttpServer(expressServer);

    await nestApp.init();

    server.listen(port, host);

    logger.log(`Nest application is running on: ${backEndServerAddress}/`);
}

(async () => await bootstrap())();
