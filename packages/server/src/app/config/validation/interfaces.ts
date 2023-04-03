import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

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
}

export interface ServerConfigOptions {
    production: boolean;
    host?: string;
    port?: number;
}
