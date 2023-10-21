import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { readFile } from 'fs/promises';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import { AppModule } from './app/app.module';
import { buildServerUrl } from './app/common';

async function bootstrap() {
    const expressServer = express();

    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressServer));
    const configService = nestApp.get(ConfigService);

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

    buildServerUrl(configService).forEach((url) => Logger.log(`Application is running on: ${url}`));
}

(async () => await bootstrap())();
