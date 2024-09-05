import { mockTokenDB } from '@dnd-mapp/data/testing';
import { TokenService } from '../../../../src/app/authentication';
import { TokenRepository } from '../../../../src/app/authentication/repositories/token.repository';

export const mockTokenModuleProviders = [
    TokenService,
    {
        provide: TokenRepository,
        useValue: mockTokenDB,
    },
    { provide: 'MAX_TOKENS', useValue: 6 },
];
