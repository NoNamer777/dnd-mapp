import { defaultClient, mockClientDB } from '@dnd-mapp/data/testing';
import { Test } from '@nestjs/testing';
import { compare } from 'bcryptjs';
import { nanoid } from 'nanoid';
import { mockClientModuleProviders, mockLoggingServiceProvider } from '../../../../testing';
import { ClientService } from './client.service';

describe('ClientService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockClientModuleProviders, ClientService],
        }).compile();

        return {
            service: module.get(ClientService),
        };
    }

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

            await expect(service.findById(id)).rejects.toThrowError(`Couldn't find Client with ID: '${id}'`);
        });
    });

    describe('register', () => {
        it('should register a new client', async () => {
            const { service } = await setupTestEnvironment();

            expect(mockClientDB.findAll()).toHaveLength(1);

            const client = await service.register();

            expect(mockClientDB.findOneById(client.id)).toBeDefined();
            expect(mockClientDB.findAll()).toHaveLength(2);
        });

        it('should store a hashed value of the client secret and provide a unhashed secret', async () => {
            const { service } = await setupTestEnvironment();

            const client = await service.register();
            const storedClient = mockClientDB.findOneById(client.id);

            expect(client.secret).not.toEqual(storedClient.secret);
            expect(await compare(client.secret, storedClient.secret)).toEqual(true);
        });

        it('should override a stored secret of an already registered client', async () => {
            const { service } = await setupTestEnvironment();
            const { id, secret } = defaultClient;

            expect(mockClientDB.findOneById(id).secret).toEqual(secret);

            await service.register(id);

            expect(mockClientDB.findAll()).toHaveLength(1);
            expect(mockClientDB.findOneById(id).secret).not.toEqual(secret);
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

            await expect(service.remove(id)).rejects.toThrowError(
                `Couldn't remove Client by ID: '${id}' because it does not exist`
            );
        });
    });
});
