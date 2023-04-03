import { plainToInstance } from 'class-transformer';
import { ServerConfigEnvironmentVariables } from './interfaces';
import { validateSync } from 'class-validator';

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(ServerConfigEnvironmentVariables, config, {
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
