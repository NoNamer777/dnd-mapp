import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { createServer as createHttpsServer } from 'https';
import { createServer as createHttpServer, Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { buildServerUrl } from './app/common';

async function bootstrap() {
    const expressServer = express();
    let server: Server;

    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressServer));
    const configService = nestApp.get(ConfigService);

    const { host, port, secured, sslCert, sslKey } = {
        host: configService.get('server.host'),
        port: configService.get('server.port'),
        secured: !!configService.get('server.ssl'),
        sslCert: configService.get('server.ssl.cert'),
        sslKey: configService.get('server.ssl.key'),
    };

    if (secured) {
        server = createHttpsServer({ cert: readFileSync(sslCert), key: readFileSync(sslKey) }, expressServer);
    } else {
        server = createHttpServer(expressServer);
    }
    await nestApp.init();

    server.listen(port, host);

    buildServerUrl(configService).forEach((url) => Logger.log(`Application is running on: ${url}`));
}

bootstrap();
