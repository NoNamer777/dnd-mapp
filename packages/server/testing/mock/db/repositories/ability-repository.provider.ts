import { getRepositoryToken } from '@nestjs/typeorm';
import { AbilityEntity } from '../../../../src/app/entities/ability';
import { mockAbilityDb } from '@dnd-mapp/data/testing';

export const abilityRepositoryProvider = {
    provide: getRepositoryToken(AbilityEntity),
    useValue: mockAbilityDb,
};
