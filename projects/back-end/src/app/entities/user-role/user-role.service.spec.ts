import { CreateUserRoleData, UserRole, UserRoles } from '@dnd-mapp/data';
import { defaultUserRole, mockUserRoleDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockLoggingServiceProvider, mockUserRoleModuleProviders } from '../../../../testing';
import { UserRoleService } from './user-role.service';

describe('UserRoleService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [UserRoleService, mockLoggingServiceProvider, ...mockUserRoleModuleProviders],
        }).compile();

        return {
            service: module.get(UserRoleService),
        };
    }

    it('should get all User Roles', async () => {
        const { service } = await setupTestEnvironment();

        expect(await service.findAll()).toHaveLength(1);
    });

    describe('get by id', () => {
        it('should get UserRole by ID', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findById(1)).toEqual(defaultUserRole);
        });

        it('should throw an Error when not finding a skill by ID', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findById(2)).rejects.toThrowError(
                new NotFoundException(`User Role with ID: '2' is not found`)
            );
        });
    });

    describe('get by name', () => {
        it('should get UserRole by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByName(UserRoles.PLAYER)).toEqual(defaultUserRole);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByName(UserRoles.ADMIN)).rejects.toThrowError(
                new NotFoundException(`User Role with name: '${UserRoles.ADMIN}' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newUserRoleData: UserRole = { id: 1, name: UserRoles.ADMIN };

            expect(await service.update(newUserRoleData)).toEqual(newUserRoleData);
            expect(mockUserRoleDB.findOneById(1)).toEqual(expect.objectContaining(newUserRoleData));
        });

        it('should throw 404 when using ID of non existing UserRole', async () => {
            const { service } = await setupTestEnvironment();
            const newUserRoleData: UserRole = { id: 2, name: UserRoles.PLAYER };

            await expect(service.update(newUserRoleData)).rejects.toThrowError(
                new NotFoundException(`Cannot update User Role with ID: '2' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockUserRoleDB.insert({ name: UserRoles.ADMIN } as CreateUserRoleData);

            const { service } = await setupTestEnvironment();
            const newUserRoleData: UserRole = { id: 1, name: UserRoles.ADMIN };

            await expect(service.update(newUserRoleData)).rejects.toThrowError(
                new NotFoundException(`Cannot update User Role because the name '${UserRoles.ADMIN}' is already used`)
            );
            expect(mockUserRoleDB.findOneById(1)).toEqual(expect.not.objectContaining(newUserRoleData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newUserRoleData: CreateUserRoleData = { name: UserRoles.ADMIN };

            expect((await service.create(newUserRoleData)).id).toBeDefined();
            expect(mockUserRoleDB.findOneByName(UserRoles.ADMIN)).toEqual(expect.objectContaining(newUserRoleData));
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newUserRoleData: CreateUserRoleData = { name: UserRoles.PLAYER };

            await expect(service.create(newUserRoleData)).rejects.toThrowError(
                new NotFoundException(`Cannot create User Role because the name '${UserRoles.PLAYER}' is already used`)
            );
        });
    });

    describe('remove', () => {
        it('should remove a UserRole by ID', async () => {
            const { service } = await setupTestEnvironment();

            await service.remove(1);
            expect(mockUserRoleDB.findOneById(1)).toBeNull();
        });

        it('should throw an error when trying to remove a UserRole by ID which does not exist', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.remove(2)).rejects.toThrowError(
                `Could not remove User Role with ID: '2' because it does not exist`
            );
        });
    });
});
