import { HttpStatus, Logger, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { readFile } from 'fs/promises';
import helmet from 'helmet';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import { AppModule } from './app/app.module';
import { DndMappLoggerService, buildServerUrl } from './app/common';
import { ServerConfig } from './app/config/server.config';

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

    const logger = await nestApp.resolve(DndMappLoggerService);
    logger.setContext('NestApplication');
    Logger.flush();

    const { host, port, address, useSsl, ssl } = configService.get<ServerConfig>('server');
    const backEndUrl = buildServerUrl(host, port, useSsl, address);

    nestApp.useLogger(logger);
    nestApp.setGlobalPrefix('/server', { exclude: [''] });
    nestApp.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    scriptSrcAttr: [`'self'`, `'unsafe-inline'`],
                    connectSrc: [backEndUrl],
                },
            },
        })
    );
    nestApp.useGlobalPipes(new ValidationPipe(validationOptions));
    nestApp.enableCors({
        origin: [backEndUrl],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Authorization', 'Content-Type'],
        exposedHeaders: ['Authorization'],
    });

    const server = useSsl
        ? createHttpsServer({ cert: await readFile(ssl.certPath), key: await readFile(ssl.keyPath) }, expressServer)
        : createHttpServer(expressServer);

    await nestApp.init();

    server.listen(port, host);

    logger.log(`Nest application is running on: ${backEndUrl}/`);
}

(async () => await bootstrap())();
