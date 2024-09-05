import { Expose } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsIn,
    IsInt,
    IsOptional,
    IsString,
    Matches,
    Max,
    Min,
    MinLength,
    ValidateIf,
} from 'class-validator';

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

    @Expose()
    @IsString()
    @IsIn(['mysql', 'sqlite'])
    @IsOptional()
    DATABASE_TYPE: string;

    @Expose()
    @IsString()
    @IsOptional()
    DATABASE_LOCATION: string;

    @Expose()
    @IsArray()
    @IsString({ each: true })
    @IsIn(['query', 'error', 'schema', 'warn', 'info', 'log'], { each: true })
    @IsOptional()
    DATABASE_LOG_LEVEL?: string[];

    @Expose()
    @IsString()
    @IsIn(['advanced-console', 'simple-console', 'file', 'debug'])
    @IsOptional()
    DATABASE_LOG_TYPE?: string;

    @Expose()
    @IsString()
    @IsOptional()
    MIGRATION_FILES_PATH?: string;

    @Expose()
    @IsString()
    @IsOptional()
    @ValidateIf((obj) => obj.DATABASE_TYPE === 'mysql')
    MYSQL_HOST?: string;

    @Expose()
    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    @ValidateIf((obj) => obj.DATABASE_TYPE === 'mysql')
    MYSQL_PORT?: number;

    @Expose()
    @IsString()
    @IsOptional()
    @ValidateIf((obj) => obj.DATABASE_TYPE === 'mysql')
    MYSQL_USERNAME?: string;

    @Expose()
    @IsString()
    @IsOptional()
    @ValidateIf((obj) => obj.DATABASE_TYPE === 'mysql')
    MYSQL_PASSWORD?: string;
}
