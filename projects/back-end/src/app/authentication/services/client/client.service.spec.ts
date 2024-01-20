import { defaultClient, mockClientDB } from '@dnd-mapp/data/testing';
import { Test } from '@nestjs/testing';
import { nanoid } from 'nanoid';
import { mockClientModuleProviders, mockLoggingServiceProvider } from '../../../../../testing';
import { ClientEntity } from '../../entities';
import { ClientService } from './client.service';

describe('ClientService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockClientModuleProviders],
        }).compile();

        return {
            service: module.get(ClientService),
        };
    }

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
            const client = { ...defaultClient };

            client.codeChallenge = 'code_challenge';

            await expect(service.update(client)).resolves.not.toThrow();
            expect(mockClientDB.findOneById(client.id).codeChallenge).toEqual('code_challenge');
        });

        it('should not update when a Client does not exist', async () => {
            const { service } = await setupTestEnvironment();
            const client = new ClientEntity();

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
