import { mockLoggingServiceProvider, mockTokenModuleProviders } from '@dnd-mapp/back-end/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { buildServerUrl } from '../../../common';
import { DndMappJwtModule, NestConfigModule, ServerConfig } from '../../../config';
import { TokenService } from './token.service';

describe('TokenService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            imports: [DndMappJwtModule, NestConfigModule],
            providers: [mockLoggingServiceProvider, ...mockTokenModuleProviders],
        }).compile();

        const { host, port, address, useSsl } = module.get(ConfigService).get<ServerConfig>('server');

        buildServerUrl(host, port, useSsl, address);

        return {
            tokenService: module.get(TokenService),
            jwtService: module.get(JwtService),
        };
    }

    it('should initialize', async () => {
        const { tokenService } = await setupTest();
        expect(tokenService).toBeDefined();
    });
});
