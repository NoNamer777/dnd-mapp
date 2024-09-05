import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';

const jwtModuleOptions: JwtModuleAsyncOptions = {
    global: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        signOptions: {
            algorithm: 'HS512',
        },
        verifyOptions: {
            ignoreExpiration: false,
            ignoreNotBefore: false,
        },
        secret: configService.get<string>('server.jwtSecret'),
    }),
};

@Module({
    imports: [JwtModule.registerAsync(jwtModuleOptions)],
    exports: [JwtModule],
})
export class DndMappJwtModule {}
