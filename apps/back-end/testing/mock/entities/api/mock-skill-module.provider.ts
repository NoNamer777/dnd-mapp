import { mockSkillDB } from '@dnd-mapp/data/testing';
import { SkillRepository, SkillService } from '../../../../src/app/entities/skill';

export const mockSkillModuleProviders = [
    SkillService,
    {
        provide: SkillRepository,
        useValue: mockSkillDB,
    },
];
