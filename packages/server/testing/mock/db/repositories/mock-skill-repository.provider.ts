import { mockSkillDB } from '@dnd-mapp/data/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SkillEntity } from '../../../../src/app/entities/skill/skill.entity';

export const mockSkillRepositoryProvider = {
    provide: getRepositoryToken(SkillEntity),
    useValue: mockSkillDB,
};
