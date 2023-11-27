import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import helmet from 'helmet';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication';
import { LoggingModule } from './common';
import {
    AssetsModule,
    HashCollectorMiddleware,
    NestConfigModule,
    ServeClientAppModule,
    TypeOrmConfigModule,
    helmetConfig,
} from './config';
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
        AssetsModule,
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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(HashCollectorMiddleware, helmet(helmetConfig)).forRoutes('/*');
    }
}
