import { mockUserRoleDB } from '@dnd-mapp/data/testing';
import { RoleRepository, RoleService } from '../../../../src/app/authentication';

export const mockRoleModuleProviders = [
    RoleService,
    {
        provide: RoleRepository,
        useValue: mockUserRoleDB,
    },
];
