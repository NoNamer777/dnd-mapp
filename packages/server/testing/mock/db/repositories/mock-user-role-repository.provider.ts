import { mockUserRoleDB } from '@dnd-mapp/data/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRoleEntity } from '../../../../src/app/entities/user-role';

export const mockUserRoleRepositoryProvider = {
    provide: getRepositoryToken(UserRoleEntity),
    useValue: mockUserRoleDB,
};
