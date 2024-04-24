import { mockLoggingServiceProvider, mockRoleModuleProviders } from '@dnd-mapp/back-end/testing';
import { RoleBuilder } from '@dnd-mapp/data';
import { defaultRole, mockRoleDB } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createId } from '@paralleldrive/cuid2';
import { RoleService } from './role.service';

describe('RoleService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            providers: [mockLoggingServiceProvider, ...mockRoleModuleProviders],
        }).compile();

        return {
            service: module.get(RoleService),
        };
    }

    it('should get all Roles', async () => {
        const { service } = await setupTest();

        expect(await service.findAll()).toHaveLength(1);
    });

    describe('get by id', () => {
        it('should get Role by ID', async () => {
            const { service } = await setupTest();

            expect(await service.findById(defaultRole.id)).toEqual(defaultRole);
        });

        it('should throw an Error when not finding a Role by ID', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.findById(id)).rejects.toThrow(
                new NotFoundException(`Role with ID: '${id}' is not found`)
            );
        });
    });

    describe('get by name', () => {
        it('should get Role by name', async () => {
            const { service } = await setupTest();

            expect(await service.findByName('Player')).toEqual(defaultRole);
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();

            await expect(service.findByName('Admin')).rejects.toThrow(
                new NotFoundException(`Role with name: 'Admin' is not found`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTest();
            const newUserRoleData = new RoleBuilder().withId(defaultRole.id).withName('Admin').build();

            expect(await service.update(newUserRoleData)).toEqual(newUserRoleData);
            expect(mockRoleDB.findOneById(defaultRole.id)).toEqual(expect.objectContaining(newUserRoleData));
        });

        it('should throw 404 when using ID of non existing UserRole', async () => {
            const { service } = await setupTest();
            const newUserRoleData = new RoleBuilder().withId().withName('Player').build();

            await expect(service.update(newUserRoleData)).rejects.toThrow(
                new NotFoundException(`Cannot update Role with ID: '${newUserRoleData.id}' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockRoleDB.create({ name: 'Admin' });

            const { service } = await setupTest();
            const newUserRoleData = new RoleBuilder().withId(defaultRole.id).withName('Admin').build();

            await expect(service.update(newUserRoleData)).rejects.toThrow(
                new NotFoundException(`Cannot update Role because the name 'Admin' is already used`)
            );
            expect(mockRoleDB.findOneById(defaultRole.id)).toEqual(expect.not.objectContaining(newUserRoleData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTest();
            const newUserRoleData = new RoleBuilder().withName('Admin').build();

            await service.create(newUserRoleData);
            expect(mockRoleDB.findOneByName('Admin')).toEqual(
                expect.objectContaining({ ...newUserRoleData, id: expect.any(String) })
            );
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTest();
            const newUserRoleData = new RoleBuilder().withName('Player').build();

            await expect(service.create(newUserRoleData)).rejects.toThrow(
                new NotFoundException(`Cannot create Role because the name 'Player' is already used`)
            );
        });
    });

    describe('remove', () => {
        it('should remove a Role by ID', async () => {
            const { service } = await setupTest();

            await service.remove(defaultRole.id);
            expect(mockRoleDB.findOneById(defaultRole.id)).toBeNull();
        });

        it('should throw an error when trying to remove a Role by ID which does not exist', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.remove(id)).rejects.toThrow(
                `Could not remove Role with ID: '${id}' because it does not exist`
            );
        });
    });
});
