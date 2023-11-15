import { mockAbilityDB } from '@dnd-mapp/data/testing';
import { AbilityRepository, AbilityService } from '../../../src/app/entities/ability';

export const mockAbilityModuleProviders = [
    AbilityService,
    {
        provide: AbilityRepository,
        useValue: mockAbilityDB,
    },
];
