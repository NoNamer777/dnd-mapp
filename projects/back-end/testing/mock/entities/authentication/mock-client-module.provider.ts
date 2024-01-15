import { mockClientDB } from '@dnd-mapp/data/testing';
import { ClientRepository, ClientService } from '../../../../src/app/entities/client';

export const mockClientModuleProviders = [
    ClientService,
    {
        provide: ClientRepository,
        useValue: mockClientDB,
    },
];
