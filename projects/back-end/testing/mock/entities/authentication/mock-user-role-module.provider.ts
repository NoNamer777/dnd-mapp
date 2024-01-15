import { mockUserRoleDB } from '@dnd-mapp/data/testing';
import { UserRoleRepository, UserRoleService } from '../../../../src/app/entities/user-role';

export const mockUserRoleModuleProviders = [
    UserRoleService,
    {
        provide: UserRoleRepository,
        useValue: mockUserRoleDB,
    },
];
