import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static';
import helmet from 'helmet';
import { join } from 'path';
import { HashCollectorMiddleware, helmetConfig } from '../security';

const serveClientBundle: ServeStaticModuleOptions = {
    rootPath: join(...[__dirname, '..', 'front-end']),
    serveRoot: '/app',
    exclude: ['/back-end/(.*)'],
    serveStaticOptions: {
        redirect: true,
    },
};

@Module({
    imports: [ServeStaticModule.forRoot(serveClientBundle)],
    exports: [ServeStaticModule],
})
export class ServeClientAppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HashCollectorMiddleware, helmet(helmetConfig)).forRoutes('/');
    }
}
