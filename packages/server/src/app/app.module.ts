import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication';
import { LoggingModule } from './common';
import { NestConfigModule, ServeClientAppModule, TypeOrmConfigModule } from './config';
import { AbilityModule } from './entities/ability';
import { RaceModule } from './entities/race';
import { SkillModule } from './entities/skill';
import { UserModule } from './entities/user';

@Module({
    imports: [
        NestConfigModule,
        TypeOrmConfigModule,
        ServeClientAppModule,
        RaceModule,
        AbilityModule,
        SkillModule,
        UserModule,
        LoggingModule,
        AuthenticationModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
