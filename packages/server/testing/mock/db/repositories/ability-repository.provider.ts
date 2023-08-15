import { getRepositoryToken } from '@nestjs/typeorm';
import { AbilityEntity } from '../../../../src/app/entities/ability';
import { mockAbilityDB } from '@dnd-mapp/data/testing';

export const abilityRepositoryProvider = {
    provide: getRepositoryToken(AbilityEntity),
    useValue: mockAbilityDB,
};
