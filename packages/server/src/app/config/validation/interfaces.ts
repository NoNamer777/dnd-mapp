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
    ValidateIf,
    ValidateNested,
} from 'class-validator';

export class ServerEnvironmentVariables {
    @Expose()
    @IsString()
    @IsOptional()
    @Matches(/.*\.(yaml|yml)$/gi)
    SERVER_CONFIG_PATH: string;
}

export class ServerSSLConfigOptions {
    @Expose()
    @IsString()
    @Matches(/.*\.pem$/gi)
    cert = './certificate.pem';

    @Expose()
    @IsString()
    @Matches(/.*\.pem$/gi)
    key = './certificate-key.pem';
}

export class ServerConfigOptions {
    @Expose()
    @IsBoolean()
    @IsOptional()
    production?: boolean = false;

    @Expose()
    @IsString()
    @IsOptional()
    host?: string = '0.0.0.0';

    @Expose()
    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    port?: number = 8080;

    @Expose()
    @IsOptional()
    ssl?: ServerSSLConfigOptions;
}

export class DatabaseConfigOptions {
    @Expose()
    @IsString()
    @IsIn(['mysql', 'sqlite'])
    @IsOptional()
    type = 'sqlite';

    @Expose()
    @IsString()
    @IsOptional()
    database = ':memory:';

    @Expose()
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    migrations: string[] = ['./packages/server/src/app/**/migrations/*'];

    @Expose()
    @IsArray()
    @IsString({ each: true })
    @IsIn(['query', 'error', 'schema', 'warn', 'info', 'log'], { each: true })
    @IsOptional()
    logging?: string[] = ['info', 'error', 'warn'];

    @Expose()
    @IsString()
    @IsIn(['advanced-console', 'simple-console', 'file', 'debug'])
    @IsOptional()
    logger?: string;

    // Config options specifically for a MySQL database
    @Expose()
    @IsString()
    @IsOptional()
    @ValidateIf((obj) => obj.type === 'mysql')
    host?: string;

    @Expose()
    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    @ValidateIf((obj) => obj.type === 'mysql')
    port?: number;

    @Expose()
    @IsString()
    @IsOptional()
    @ValidateIf((obj) => obj.type === 'mysql')
    username?: string;

    @Expose()
    @IsString()
    @IsOptional()
    @ValidateIf((obj) => obj.type === 'mysql')
    password?: string;
}

export class ConfigOptions {
    @Expose()
    @IsOptional()
    @ValidateNested()
    server?: ServerConfigOptions;

    @Expose()
    @IsOptional()
    @ValidateNested()
    database?: DatabaseConfigOptions;
}
