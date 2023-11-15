import { mockUserDB } from '@dnd-mapp/data/testing';
import { UserRepository, UserService } from '../../../src/app/entities/user';

export const mockUserModuleProviders = [
    UserService,
    {
        provide: UserRepository,
        useValue: mockUserDB,
    },
];
