import { getRepositoryToken } from '@nestjs/typeorm';
import { mockSkillDB } from '@dnd-mapp/data/testing';
import { SkillEntity } from '../../../../src/app/entities/skill/skill.entity';

export const skillRepositoryProvider = {
    provide: getRepositoryToken(SkillEntity),
    useValue: mockSkillDB,
};
