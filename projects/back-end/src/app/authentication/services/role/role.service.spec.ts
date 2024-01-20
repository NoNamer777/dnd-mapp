import { CreateRoleData, Role, Roles } from '@dnd-mapp/data';
import { defaultRole, mockRoleDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockLoggingServiceProvider, mockRoleModuleProviders } from '../../../../../testing';
import { RoleService } from './role.service';

describe('RoleService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [RoleService, mockLoggingServiceProvider, ...mockRoleModuleProviders],
        }).compile();

        return {
            service: module.get(RoleService),
        };
    }

    it('should get all User Roles', async () => {
        const { service } = await setupTestEnvironment();

        expect(await service.findAll()).toHaveLength(1);
    });

    describe('get by id', () => {
        it('should get UserRole by ID', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findById(1)).toEqual(defaultRole);
        });

        it('should throw an Error when not finding a skill by ID', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findById(2)).rejects.toThrow(
                new NotFoundException(`User Role with ID: '2' is not found`)
            );
        });
    });

    describe('get by name', () => {
        it('should get UserRole by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByName(Roles.PLAYER)).toEqual(defaultRole);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByName(Roles.ADMIN)).rejects.toThrow(
                new NotFoundException(`User Role with name: '${Roles.ADMIN}' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newUserRoleData: Role = { id: 1, name: Roles.ADMIN };

            expect(await service.update(newUserRoleData)).toEqual(newUserRoleData);
            expect(mockRoleDB.findOneById(1)).toEqual(expect.objectContaining(newUserRoleData));
        });

        it('should throw 404 when using ID of non existing UserRole', async () => {
            const { service } = await setupTestEnvironment();
            const newUserRoleData: Role = { id: 2, name: Roles.PLAYER };

            await expect(service.update(newUserRoleData)).rejects.toThrow(
                new NotFoundException(`Cannot update User Role with ID: '2' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockRoleDB.insert({ name: Roles.ADMIN } as CreateRoleData);

            const { service } = await setupTestEnvironment();
            const newUserRoleData: Role = { id: 1, name: Roles.ADMIN };

            await expect(service.update(newUserRoleData)).rejects.toThrow(
                new NotFoundException(`Cannot update User Role because the name '${Roles.ADMIN}' is already used`)
            );
            expect(mockRoleDB.findOneById(1)).toEqual(expect.not.objectContaining(newUserRoleData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newUserRoleData: CreateRoleData = { name: Roles.ADMIN };

            expect((await service.create(newUserRoleData)).id).toBeDefined();
            expect(mockRoleDB.findOneByName(Roles.ADMIN)).toEqual(expect.objectContaining(newUserRoleData));
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newUserRoleData: CreateRoleData = { name: Roles.PLAYER };

            await expect(service.create(newUserRoleData)).rejects.toThrow(
                new NotFoundException(`Cannot create User Role because the name '${Roles.PLAYER}' is already used`)
            );
        });
    });

    describe('remove', () => {
        it('should remove a UserRole by ID', async () => {
            const { service } = await setupTestEnvironment();

            await service.remove(1);
            expect(mockRoleDB.findOneById(1)).toBeNull();
        });

        it('should throw an error when trying to remove a UserRole by ID which does not exist', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.remove(2)).rejects.toThrow(
                `Could not remove User Role with ID: '2' because it does not exist`
            );
        });
    });
});
