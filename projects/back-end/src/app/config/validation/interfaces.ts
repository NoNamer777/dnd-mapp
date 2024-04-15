import { Expose } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Matches, Max, Min, MinLength } from 'class-validator';

export class ServerEnvironmentVariables {
    @Expose()
    @IsBoolean()
    @IsOptional()
    PRODUCTION?: boolean;

    @Expose()
    @IsString()
    @IsOptional()
    ADDRESS?: string;

    @Expose()
    @IsString()
    @IsOptional()
    HOST?: string;

    @Expose()
    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    PORT?: number;

    @Expose()
    @IsString()
    @MinLength(16)
    JWT_SECRET: string;

    @Expose()
    @IsString()
    @MinLength(16)
    COOKIE_SECRET: string;

    @Expose()
    @IsBoolean()
    @IsOptional()
    USE_SSL?: boolean;

    @Expose()
    @IsString()
    @Matches(/.*\.pem$/gi)
    @IsOptional()
    SSL_CERT_PATH: string;

    @Expose()
    @IsString()
    @Matches(/.*\.pem$/gi)
    @IsOptional()
    SSL_KEY_PATH: string;
}
