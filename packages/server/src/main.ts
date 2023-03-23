import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 8080;
    
    await app.listen(port);
    
    Logger.log(`Application is running on: http://localhost:${port}/`);
}

bootstrap();
