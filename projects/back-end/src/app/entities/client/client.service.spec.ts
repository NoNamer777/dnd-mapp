import { defaultClient, mockClientDB } from '@dnd-mapp/data/testing';
import { Test } from '@nestjs/testing';
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
