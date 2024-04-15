import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication';
import { LoggingModule, SessionCookieMiddleware } from './common';
import { AssetsModule, DatabaseModule, NestConfigModule, RateLimitModule, ServeClientAppModule } from './config';
import { AbilityModule } from './entities/ability';
import { EntityModule } from './entities/entity.module';
import { RaceModule } from './entities/race';
import { SkillModule } from './entities/skill';

@Module({
    imports: [
        NestConfigModule,
        DatabaseModule,
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
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SessionCookieMiddleware)
            .forRoutes('/api/*', '/authentication', '/authentication/*', '/session', '/session/*');
    }
}
