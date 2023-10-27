import { defaultUser, mockUserDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockUserRepositoryProvider } from '../../../../testing';
import { mockLoggingServiceProvider } from '../../../../testing/mock/db/common/mock-logging-service.provider';
import { UserService } from './user.service';

describe('UserService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [UserService, mockUserRepositoryProvider, mockLoggingServiceProvider],
        }).compile();

        return {
            service: module.get(UserService),
        };
    }

    it('should get all Users', async () => {
        const { service } = await setupTestEnvironment();

        expect(await service.findAll()).toHaveLength(1);
        expect(await service.findAll()).toEqual(expect.arrayContaining([expect.objectContaining(defaultUser)]));
    });

    describe('get by id', () => {
        it('should get User by ID', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findById(1)).toEqual(defaultUser);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findById(2)).rejects.toThrowError(
                new NotFoundException(`User with ID: '2' is not found`)
            );
        });
    });

    describe('get by name', () => {
        it('should get User by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByUsername('User1')).toEqual(defaultUser);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByUsername('User Test')).rejects.toThrowError(
                new NotFoundException(`User with name: 'User Test' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newUserData = { ...defaultUser, username: 'User11' };

            expect(await service.update(newUserData)).toEqual(newUserData);
            expect(mockUserDB.findOneById(1)).toEqual(expect.objectContaining(newUserData));
        });

        it('should throw 404 when using ID of non existing User', async () => {
            const { service } = await setupTestEnvironment();
            const newUserData = { ...defaultUser, id: 2, username: 'User Test Test' };

            await expect(service.update(newUserData)).rejects.toThrowError(
                new NotFoundException(`Cannot update User with ID: '2' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockUserDB.insert({
                username: 'User Test Test',
                emailAddress: 'user-test-test@domain.com',
                password: 'secure_password',
            });

            const { service } = await setupTestEnvironment();
            const newUserData = { ...defaultUser, username: 'User Test Test' };

            await expect(service.update(newUserData)).rejects.toThrowError(
                new NotFoundException(`Cannot update User because the name 'User Test Test' is already used`)
            );
            expect(mockUserDB.findOneById(1)).toEqual(expect.not.objectContaining(newUserData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newUserData = {
                username: 'New User Test',
                emailAddress: 'user-test-test@domain.com',
                password: 'secure_password',
            };

            expect((await service.create(newUserData)).id).toBeDefined();
            expect(mockUserDB.findOneByUsername('New User Test')).toEqual(expect.objectContaining(newUserData));
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newUserData = { username: 'User1', emailAddress: 'user1@domain.com', password: 'secure_password' };

            await expect(service.create(newUserData)).rejects.toThrowError(
                new NotFoundException(`Cannot create User because the name 'User1' is already used`)
            );
        });
    });

    describe('delete', () => {
        it('should delete', async () => {
            const { service } = await setupTestEnvironment();

            await service.remove(1);
            expect(mockUserDB.findOneById(1)).toBeNull();
        });

        it('should throw 404 for deleting non existent User', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.remove(2)).rejects.toThrowError(
                new NotFoundException(`Could not remove User with ID: '2' because it does not exist`)
            );
        });
    });
});
