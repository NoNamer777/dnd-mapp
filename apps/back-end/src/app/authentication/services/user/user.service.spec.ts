import { UserBuilder } from '@dnd-mapp/data';
import { defaultUser, mockUserDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockLoggingServiceProvider, mockRoleModuleProviders, mockUserModuleProviders } from '../../../../../testing';
import { UserService } from './user.service';

describe('UserService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockUserModuleProviders, ...mockRoleModuleProviders],
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

            await expect(service.findById(2)).rejects.toThrow(new NotFoundException(`User with ID: '2' is not found`));
        });
    });

    describe('get by name', () => {
        it('should get User by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByUsername('User1')).toEqual(defaultUser);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByUsername('User Test')).rejects.toThrow(
                new NotFoundException(`User with name: 'User Test' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newUserData = new UserBuilder()
                .withUsername('User11')
                .withPassword(defaultUser.password)
                .withId(defaultUser.id)
                .build();

            expect(await service.update(newUserData)).toEqual(newUserData);
            expect(mockUserDB.findOneById(1)).toEqual(expect.objectContaining(newUserData));
        });

        it('should update the password with a new hashed password', async () => {
            const { service } = await setupTestEnvironment();
            const newUserData = new UserBuilder().withPassword('new_secure_password').withId(defaultUser.id).build();

            expect(await service.update(newUserData)).toEqual(newUserData);
            expect(mockUserDB.findOneById(1)).toEqual(expect.objectContaining(newUserData));
        });

        it('should throw 404 when using ID of non existing User', async () => {
            const { service } = await setupTestEnvironment();
            const newUserData = new UserBuilder().withId(2).build();

            await expect(service.update(newUserData)).rejects.toThrow(
                new NotFoundException(`Cannot update User with ID: '2' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockUserDB.insert(new UserBuilder().withUsername('User Test Test').build());

            const { service } = await setupTestEnvironment();
            const newUserData = new UserBuilder().withUsername('User Test Test').withId(defaultUser.id).build();

            await expect(service.update(newUserData)).rejects.toThrow(
                new NotFoundException(`Cannot update User because the username 'User Test Test' is already used`)
            );
            expect(mockUserDB.findOneById(1)).toEqual(expect.not.objectContaining(newUserData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newUserData = new UserBuilder()
                .withUsername('New User Test')
                .withEmailAddress('user-test-test@domain.com')
                .withPassword('secure_password')
                .build();

            expect((await service.create(newUserData)).id).toBeDefined();
            expect(mockUserDB.findOneByUsername('New User Test')).toEqual(
                expect.objectContaining({ id: expect.any(Number) })
            );
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newUserData = new UserBuilder().withUsername('User1').build();

            await expect(service.create(newUserData)).rejects.toThrow(
                new NotFoundException(`Cannot create User because the username 'User1' is already used`)
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

            await expect(service.remove(2)).rejects.toThrow(
                new NotFoundException(`Could not remove User with ID: '2' because it does not exist`)
            );
        });
    });
});
