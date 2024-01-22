import { ClientModel } from '@dnd-mapp/data';
import { defaultClient, mockClientDB } from '@dnd-mapp/data/testing';
import { ForbiddenException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { mockClientModuleProviders, mockLoggingServiceProvider } from '../../../../../testing';
import { ClientService } from './client.service';

fdescribe('ClientService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockClientModuleProviders],
        }).compile();

        return {
            service: module.get(ClientService),
        };
    }

    it('should reset authorization for Client', async () => {
        defaultClient.codeGeneratedAt = new Date();
        defaultClient.codeChallenge = 'code_challenge';
        defaultClient.authorizationCode = 'authorization_code';

        const { service } = await setupTestEnvironment();

        expect(mockClientDB.findOneById(defaultClient.id)).toEqual(
            expect.objectContaining({
                codeGeneratedAt: expect.any(Date),
                codeChallenge: 'code_challenge',
                authorizationCode: 'authorization_code',
            })
        );

        await service.resetClientAuthorization(defaultClient);

        expect(mockClientDB.findOneById(defaultClient.id)).toEqual(
            expect.objectContaining({
                codeGeneratedAt: null,
                codeChallenge: null,
                authorizationCode: null,
            })
        );
    });

    describe('create', () => {
        it('should create a new client', async () => {
            const { service } = await setupTestEnvironment();

            expect(mockClientDB.findAll()).toHaveLength(1);

            const client = await service.create();

            expect(mockClientDB.findOneById(client.id)).toBeDefined();
            expect(mockClientDB.findAll()).toHaveLength(2);
        });
    });

    describe('findById', () => {
        it('should find a Client by ID', async () => {
            const { service } = await setupTestEnvironment();
            const { id } = defaultClient;

            expect(await service.findById(id)).toEqual(defaultClient);
        });

        it('should not find a Client by ID and not throw', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findById(nanoid(32), false)).toBeNull();
        });

        it('should throw a 404 when not being able to find a Client by ID', async () => {
            const { service } = await setupTestEnvironment();
            const id = nanoid(32);

            await expect(service.findById(id)).rejects.toThrow(`Couldn't find Client with ID: '${id}'`);
        });
    });

    describe('update', () => {
        it('should update an existing Client', async () => {
            const { service } = await setupTestEnvironment();

            defaultClient.codeChallenge = 'code_challenge';

            await expect(service.update(defaultClient)).resolves.not.toThrow();
            expect(mockClientDB.findOneById(defaultClient.id).codeChallenge).toEqual('code_challenge');
        });

        it('should not update when a Client does not exist', async () => {
            const { service } = await setupTestEnvironment();
            const client = new ClientModel();

            await expect(service.update(client)).rejects.toThrow(
                `Could not update client with ID: '${client.id}' because it does not exist`
            );
        });
    });

    describe('generateAuthorizationCode', () => {
        it('should generate an authorization code for a Client', async () => {
            const { service } = await setupTestEnvironment();
            const { id } = defaultClient;

            expect(defaultClient.authorizationCode).toBeNull();
            expect(defaultClient.codeGeneratedAt).toBeNull();

            await service.generateAuthorizationCodeForClient(id);

            const { authorizationCode, codeGeneratedAt } = mockClientDB.findOneById(defaultClient.id);

            expect(authorizationCode).not.toBeNull();
            expect(codeGeneratedAt).not.toBeNull();
        });

        it('should not generate an authorization code for a Client that does not exist', async () => {
            const { service } = await setupTestEnvironment();
            const id = nanoid(32);

            await expect(service.generateAuthorizationCodeForClient(id)).rejects.toThrow(
                `Could not generate authorization code for Client with ID: '${id}' because it does not exist`
            );
        });
    });

    describe('verifyCodeChallengeForClient', () => {
        it('should verify the code challenge', async () => {
            defaultClient.codeChallenge = crypto
                .createHash('sha256')
                .update('code_challenge')
                .digest()
                .toString('base64');

            const { service } = await setupTestEnvironment();

            await expect(service.verifyCodeChallengeForClient(defaultClient, 'code_challenge')).resolves.not.toThrow();
        });

        it('should fail to verify the code challenge', async () => {
            defaultClient.codeChallenge = 'code_challenge';

            const { service } = await setupTestEnvironment();

            await expect(service.verifyCodeChallengeForClient(defaultClient, 'code_challenge')).rejects.toThrow(
                new ForbiddenException()
            );

            expect(defaultClient.codeChallenge).toBeNull();
        });
    });

    describe('verifyAuthorizationCodeForClient', () => {
        it('should verify the authorization code', async () => {
            defaultClient.codeGeneratedAt = new Date();
            defaultClient.authorizationCode = 'authorization_code';

            const { service } = await setupTestEnvironment();

            await expect(service.verifyAuthorizationCode(defaultClient, 'authorization_code')).resolves.not.toThrow();
        });

        it('should throw when verifying the authorization code outside of the validity window', async () => {
            defaultClient.codeGeneratedAt = new Date(2000, 1, 1, 1, 1, 1, 1);
            defaultClient.authorizationCode = 'authorization_code';

            const { service } = await setupTestEnvironment();

            await expect(service.verifyAuthorizationCode(defaultClient, 'authorization_code')).rejects.toThrow(
                new ForbiddenException()
            );
        });

        it('should throw when verifying the authorization code with an invalid code', async () => {
            defaultClient.codeGeneratedAt = new Date();
            defaultClient.authorizationCode = 'authorization_code';

            const { service } = await setupTestEnvironment();

            await expect(service.verifyAuthorizationCode(defaultClient, 'invalid_code')).rejects.toThrow(
                new ForbiddenException()
            );
        });
    });

    describe('remove', () => {
        it('should remove a client by ID', async () => {
            const { service } = await setupTestEnvironment();
            const { id } = defaultClient;

            expect(mockClientDB.findAll()).toHaveLength(1);

            await service.remove(id);
            expect(mockClientDB.findAll()).toHaveLength(0);
            expect(mockClientDB.findOneById(id)).toBeNull();
        });

        it('should throw an 404 while trying to remove a client', async () => {
            const { service } = await setupTestEnvironment();
            const id = nanoid(32);

            await expect(service.remove(id)).rejects.toThrow(
                `Couldn't remove Client by ID: '${id}' because it does not exist`
            );
        });
    });
});
