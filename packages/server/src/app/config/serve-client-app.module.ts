import { Module } from '@nestjs/common';
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

const serveStaticOptions: ServeStaticModuleOptions = {
    rootPath: join(__dirname, '..', 'client'),
    serveRoot: '/app',
    exclude: ['/server/(.*)'],
    serveStaticOptions: {
        redirect: true,
    },
};

@Module({
    imports: [ServeStaticModule.forRoot(serveStaticOptions)],
    exports: [ServeStaticModule],
})
export class ServeClientAppModule {}
