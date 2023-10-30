import { HttpStatus, Logger, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
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

const corsOptions: (configService: ConfigService) => CorsOptions = (configService) => ({
    origin: [`${buildServerUrl(configService)}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization'],
});

async function bootstrap() {
    const expressServer = express();

    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressServer), { bufferLogs: true });
    const configService = nestApp.get(ConfigService);

    const logger = await nestApp.resolve(DndMappLoggerService);
    logger.setContext('NestApplication');
    Logger.flush();

    nestApp.useLogger(logger);
    nestApp.setGlobalPrefix('/server', { exclude: [''] });
    nestApp.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    scriptSrcAttr: [`'self'`, `'unsafe-inline'`],
                    connectSrc: [`${buildServerUrl(configService)}`],
                },
            },
        })
    );
    nestApp.useGlobalPipes(new ValidationPipe(validationOptions));
    nestApp.enableCors(corsOptions(configService));

    const { host, port, secured, ssl } = {
        host: configService.get('server.host'),
        port: configService.get('server.port'),
        secured: Boolean(configService.get('server.ssl')),
        ssl: configService.get('server.ssl'),
    };

    const server = secured
        ? createHttpsServer({ cert: await readFile(ssl.certPath), key: await readFile(ssl.keyPath) }, expressServer)
        : createHttpServer(expressServer);

    await nestApp.init();

    server.listen(port, host);

    logger.log(`Nest application is running on: ${buildServerUrl(configService)}/`);
}

(async () => await bootstrap())();
