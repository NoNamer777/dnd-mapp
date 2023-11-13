import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication';
import { LoggingModule } from './common';
import { NestConfigModule, ServeClientAppModule, TypeOrmConfigModule } from './config';
import { AbilityModule } from './entities/ability';
import { EntityModule } from './entities/entity.module';
import { RaceModule } from './entities/race';
import { SkillModule } from './entities/skill';
import { UserModule } from './entities/user';
import { UserRoleModule } from './entities/user-role';

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
        UserRoleModule,
        EntityModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
