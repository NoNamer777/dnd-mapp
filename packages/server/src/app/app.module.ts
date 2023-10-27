import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication';
import { LoggerModule } from './common';
import { ServeClientAppModule, TypeOrmConfigModule } from './config';
import { NestConfigModule } from './config/nest-config.module';
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
        LoggerModule,
        AuthenticationModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
