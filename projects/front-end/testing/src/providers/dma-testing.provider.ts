import { APP_INITIALIZER } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '../../../src/app/shared';

export function withInitializedConfig() {
    return {
        provide: APP_INITIALIZER,
        deps: [ConfigService],
        useFactory: (configService: ConfigService) => async () => await firstValueFrom(configService.initialize()),
        multi: true,
    };
}
