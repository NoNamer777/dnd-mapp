import { plainToInstance } from 'class-transformer';
import { ServerEnvironmentVariables } from './interfaces';
import { validateSync } from 'class-validator';

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(ServerEnvironmentVariables, config, {
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
