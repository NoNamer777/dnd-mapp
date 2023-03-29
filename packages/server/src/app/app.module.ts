import { Module } from '@nestjs/common';
import { RaceModule } from './models/race';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigProvider } from './providers';

@Module({
    imports: [RaceModule, TypeOrmModule.forRoot({ ...TypeOrmConfigProvider })],
})
export class AppModule {}
