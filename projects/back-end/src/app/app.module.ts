import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import helmet from 'helmet';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication';
import { ClientIdHeaderMiddleware, LoggingModule } from './common';
import {
    AssetsModule,
    HashCollectorMiddleware,
    NestConfigModule,
    RateLimitModule,
    ServeClientAppModule,
    TypeOrmConfigModule,
    helmetConfig,
} from './config';
import { AbilityModule } from './entities/ability';
import { EntityModule } from './entities/entity.module';
import { RaceModule } from './entities/race';
import { SkillModule } from './entities/skill';

@Module({
    imports: [
        NestConfigModule,
        TypeOrmConfigModule,
        AssetsModule,
        ServeClientAppModule,
        LoggingModule,
        RateLimitModule,
        AuthenticationModule,
        EntityModule,
        RaceModule,
        AbilityModule,
        SkillModule,
    ],
    controllers: [AppController],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ClientIdHeaderMiddleware, HashCollectorMiddleware, helmet(helmetConfig)).forRoutes('/*');
    }
}
