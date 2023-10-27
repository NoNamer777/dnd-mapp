import { mockAbilityDB } from '@dnd-mapp/data/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AbilityEntity } from '../../../../src/app/entities/ability';

export const mockAbilityRepositoryProvider = {
    provide: getRepositoryToken(AbilityEntity),
    useValue: mockAbilityDB,
};
