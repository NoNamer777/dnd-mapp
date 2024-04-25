import { mockLoggingServiceProvider, mockSessionProviders, mockTokenModuleProviders } from '@dnd-mapp/back-end/testing';
import { Test } from '@nestjs/testing';
import { DndMappJwtModule } from '../../../config';
import { SessionService } from './session.service';

describe('SessionService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            imports: [DndMappJwtModule],
            providers: [mockLoggingServiceProvider, ...mockSessionProviders, ...mockTokenModuleProviders],
        }).compile();

        return {
            service: module.get(SessionService),
        };
    }

    it('should initialize', async () => {
        const { service } = await setupTest();
        expect(service).toBeDefined();
    });
});
