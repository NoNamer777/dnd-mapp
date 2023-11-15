import { ABILITY_SERVICE_TOKEN, AbilityService } from './ability.service';

export const abilityServiceProvider = {
    provide: ABILITY_SERVICE_TOKEN,
    useExisting: AbilityService,
};
