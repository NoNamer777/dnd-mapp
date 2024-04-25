import {
    mockLoggingServiceProvider,
    mockRoleModuleProviders,
    mockSessionProviders,
    mockTokenModuleProviders,
    mockUserModuleProviders,
} from '@dnd-mapp/back-end/testing';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { buildServerUrl } from '../../../common';
import { DndMappJwtModule, NestConfigModule, ServerConfig } from '../../../config';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            imports: [NestConfigModule, DndMappJwtModule],
            providers: [
                AuthenticationService,
                mockLoggingServiceProvider,
                ...mockUserModuleProviders,
                ...mockRoleModuleProviders,
                ...mockTokenModuleProviders,
                ...mockSessionProviders,
            ],
        }).compile();

        const { host, port, useSsl, address } = module.get(ConfigService).get<ServerConfig>('server');

        buildServerUrl(host, port, useSsl, address);

        return {
            service: module.get(AuthenticationService),
        };
    }

    it('should initialize', async () => {
        const { service } = await setupTest();
        expect(service).toBeDefined();
    });
});
