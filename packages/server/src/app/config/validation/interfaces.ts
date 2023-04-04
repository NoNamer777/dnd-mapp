import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ServerConfigEnvironmentVariables {
    @Expose()
    @IsBoolean()
    SERVER_PRODUCTION: boolean;

    @Expose()
    @IsOptional()
    @IsString()
    SERVER_HOST: string;

    @Expose()
    @IsOptional()
    @IsInt()
    SERVER_PORT: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    SERVER_SECURE: boolean;

    @Expose()
    @IsOptional()
    @IsString()
    SEVER_SSL_CERT: string;

    @Expose()
    @IsOptional()
    @IsString()
    SERVER_SSL_KEY: string;
}

export interface ServerConfigOptions {
    production: boolean;
    host?: string;
    port?: number;
    secure?: boolean;
    ssl?: ServerSSLConfigOptions;
    database?: TypeOrmModuleOptions;
}

interface ServerSSLConfigOptions {
    cert: string;
    key: string;
}
