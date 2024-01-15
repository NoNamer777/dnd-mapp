import { mockUserDB } from '@dnd-mapp/data/testing';
import { UserRepository, UserService } from '../../../../src/app/authentication';

export const mockUserModuleProviders = [
    UserService,
    {
        provide: UserRepository,
        useValue: mockUserDB,
    },
];
