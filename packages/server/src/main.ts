import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import * as https from 'https';
import { ExpressAdapter } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { buildServerUrl } from './app/common';

async function bootstrap() {
    const server = express();

    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(server));
    const configService = nestApp.get(ConfigService);

    const { host, port, secured, sslCert, sslKey } = {
        host: configService.get('server.host'),
        port: configService.get('server.port'),
        secured: !!configService.get('server.ssl'),
        sslCert: configService.get('server.ssl.cert'),
        sslKey: configService.get('server.ssl.key'),
    };

    const httpsServer = https.createServer(
        !secured ? {} : { cert: readFileSync(sslCert), key: readFileSync(sslKey) },
        server
    );

    await nestApp.init();
    await httpsServer.listen(port, host);

    buildServerUrl(configService).forEach((url) => Logger.log(`Application is running on: ${url}`));
}

bootstrap();
