import {
    mockLoggingServiceProvider,
    mockRoleModuleProviders,
    mockUserModuleProviders,
} from '@dnd-mapp/back-end/testing';
import { UserBuilder } from '@dnd-mapp/data';
import { defaultUser, mockUserDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createId } from '@paralleldrive/cuid2';
import { UserService } from './user.service';

describe('UserService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockUserModuleProviders, ...mockRoleModuleProviders],
        }).compile();

        return {
            service: module.get(UserService),
        };
    }

    it('should get all Users', async () => {
        const { service } = await setupTest();

        expect(await service.findAll()).toHaveLength(1);
    });

    describe('get by id', () => {
        it('should get User by ID', async () => {
            const { service } = await setupTest();

            expect(await service.findById(defaultUser.id)).toEqual(defaultUser);
        });

        it('should return null', async () => {
            const { service } = await setupTest();

            expect(await service.findById(createId(), false)).toBeNull();
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.findById(id)).rejects.toThrow(
                new NotFoundException(`User with ID: '${id}' is not found`)
            );
        });
    });

    describe('get by name', () => {
        it('should get User by name', async () => {
            const { service } = await setupTest();

            expect(await service.findByUsername(defaultUser.username)).toEqual(defaultUser);
        });

        it('should return null', async () => {
            const { service } = await setupTest();

            expect(await service.findByUsername('User2', false)).toBeNull();
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();

            await expect(service.findByUsername('User Test')).rejects.toThrow(
                new NotFoundException(`User with name: 'User Test' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTest();

            const { id, password } = defaultUser;
            const updatedUser = new UserBuilder().withId(id).withUsername('User2').withPassword(password).build();

            await service.update(updatedUser);
            expect(mockUserDB.findOneById(defaultUser.id)).toEqual(
                expect.objectContaining({
                    ...defaultUser,
                    ...updatedUser,
                })
            );
        });

        it('should update the password with a new hashed password', async () => {
            const { service } = await setupTest();

            const { id, username } = defaultUser;
            const updatedUser = new UserBuilder()
                .withId(id)
                .withUsername(username)
                .withPassword('new_secure_password')
                .build();

            await service.update(updatedUser);
            expect(mockUserDB.findOneById(defaultUser.id)).toEqual(
                expect.objectContaining({
                    ...defaultUser,
                    ...updatedUser,
                })
            );
        });

        it('should throw 404 when using ID of non existing User', async () => {
            const { service } = await setupTest();
            const newUserData = new UserBuilder().withId().build();

            await expect(service.update(newUserData)).rejects.toThrow(
                new NotFoundException(`Cannot update User with ID: '${newUserData.id}' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockUserDB.create(new UserBuilder().withUsername('User Test Test').build());

            const { service } = await setupTest();

            const { id, password } = defaultUser;
            const updatedUser = new UserBuilder()
                .withId(id)
                .withUsername('User Test Test')
                .withPassword(password)
                .build();

            await expect(service.update(updatedUser)).rejects.toThrow(
                new NotFoundException(`Cannot update User because the username 'User Test Test' is already used`)
            );
            expect(mockUserDB.findOneById(defaultUser.id)).toEqual(defaultUser);
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTest();
            const newUserData = new UserBuilder()
                .withUsername('New User Test')
                .withEmailAddress('user-test-test@domain.com')
                .withPassword('secure_password')
                .build();

            await service.create(newUserData);
            expect(mockUserDB.findOneByUsername('New User Test')).toEqual(
                expect.objectContaining({ ...newUserData, id: expect.any(String) })
            );
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTest();
            const newUserData = new UserBuilder().withUsername('User1').build();

            await expect(service.create(newUserData)).rejects.toThrow(
                new NotFoundException(`Cannot create User because the username 'User1' is already used`)
            );
        });
    });

    describe('delete', () => {
        it('should delete', async () => {
            const { service } = await setupTest();

            await service.remove(defaultUser.id);
            expect(mockUserDB.findOneById(defaultUser.id)).toBeNull();
        });

        it('should throw 404 for deleting non existent User', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.remove(id)).rejects.toThrow(
                new NotFoundException(`Could not remove User with ID: '${id}' because it does not exist`)
            );
        });
    });
});
