import { mockTokenDB } from '@dnd-mapp/data/testing';
import { TokenRepository, TokenService } from '../../../../../src/app/authentication';

export const mockTokenModuleProviders = [
    TokenService,
    {
        provide: TokenRepository,
        useValue: mockTokenDB,
    },
    { provide: 'MAX_TOKENS', useValue: 6 },
];
