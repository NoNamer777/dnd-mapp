import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import {
    ConfigOptions,
    DatabaseConfigOptions,
    ServerConfigOptions,
    ServerSSLConfigOptions,
} from './validation/interfaces';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

const YAML_ENVIRONMENT_PATH = process.env.SERVER_CONFIG_PATH;

function validateConfig(config: Record<string, unknown>): ConfigOptions {
    const validatedConfig = plainToInstance(ConfigOptions, config, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
    });
    const errors = validateSync(validatedConfig, {
        forbidUnknownValues: true,
        skipMissingProperties: false,
        stopAtFirstError: true,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}

export default () => {
    let config: Record<string, unknown>;
    try {
        config = load(readFileSync(YAML_ENVIRONMENT_PATH, 'utf-8')) as Record<string, unknown>;
    } catch (error) {
        config = new ConfigOptions() as Record<string, unknown>;

        config.server = new ServerConfigOptions();
        (config.server as ServerConfigOptions).ssl = new ServerSSLConfigOptions();
        config.database = new DatabaseConfigOptions();
    }
    return validateConfig(config);
};
