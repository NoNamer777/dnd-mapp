import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

async function bootstrap() {
    const nestAppConfig =
        process.env.SERVER_SECURE !== 'true'
            ? {}
            : {
                  httpsOptions: {
                      cert: readFileSync(process.env.SERVER_SSL_CERT),
                      key: readFileSync(process.env.SERVER_SSL_KEY),
                  },
              };

    const nestApp = await NestFactory.create(AppModule, nestAppConfig);
    const configServer = nestApp.get(ConfigService);

    const { host, port } = {
        host: configServer.get('host'),
        port: configServer.get('port'),
    };

    await nestApp.listen(port, host);

    Logger.log(`Application is running on: ${await nestApp.getUrl()}/`);
}

bootstrap();
