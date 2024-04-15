import { mockSessionDB } from '@dnd-mapp/data/testing';
import { SessionRepository, SessionService } from '../../../../src/app/authentication';

export const mockSessionProviders = [
    SessionService,
    {
        provide: SessionRepository,
        useValue: mockSessionDB,
    },
];
