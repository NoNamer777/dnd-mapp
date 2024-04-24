import { mockAbilityModuleProviders, mockLoggingServiceProvider } from '@dnd-mapp/back-end/testing';
import { AbilityBuilder } from '@dnd-mapp/data';
import { defaultAbility, mockAbilityDB } from '@dnd-mapp/data/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createId } from '@paralleldrive/cuid2';
import { EntityService } from '../entity.service';
import { AbilityService } from './ability.service';
import { abilityServiceProvider } from './providers';

describe('AbilityService', () => {
    async function setupTest() {
        const module = await Test.createTestingModule({
            providers: [
                mockLoggingServiceProvider,
                ...mockAbilityModuleProviders,
                abilityServiceProvider,
                EntityService,
            ],
        }).compile();

        await module.init();

        return {
            service: module.get(AbilityService),
        };
    }

    it('should return all Abilities', async () => {
        const { service } = await setupTest();

        expect((await service.findAll()).length).toEqual(1);
    });

    describe('get by ID', () => {
        it('should get Ability by ID', async () => {
            const { service } = await setupTest();

            expect(await service.findById(defaultAbility.id)).toEqual(defaultAbility);
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.findById(id)).rejects.toThrow(
                new NotFoundException(`Ability with ID: '${id}' is not found`)
            );
        });

        it('should not throw 404 when not found', async () => {
            const { service } = await setupTest();

            expect(await service.findById(createId(), false)).toBeNull();
        });
    });

    describe('get by name', () => {
        it('should get Ability by name', async () => {
            const { service } = await setupTest();

            expect(await service.findByName('Dexterity')).toEqual(defaultAbility);
        });

        it('should throw 404', async () => {
            const { service } = await setupTest();

            await expect(service.findByName('Strength')).rejects.toThrow(
                new NotFoundException(`Ability with name: 'Strength' is not found`)
            );
        });

        it('should not throw 404 when not found', async () => {
            const { service } = await setupTest();

            expect(await service.findByName('Strength', false)).toBeNull();
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTest();
            defaultAbility.name = 'Strength';

            await service.update(defaultAbility);
            expect(mockAbilityDB.findOneById(defaultAbility.id)).toEqual(defaultAbility);
        });

        it('should throw 404 when using ID of non existing Ability', async () => {
            const { service } = await setupTest();
            const newAbilityData = new AbilityBuilder().withId().build();

            await expect(service.update(newAbilityData)).rejects.toThrow(
                new NotFoundException(`Cannot update Ability with ID: '${newAbilityData.id}' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockAbilityDB.create({ name: 'Strength', skills: [] });

            const { service } = await setupTest();
            const updatedAbility = new AbilityBuilder().withId(defaultAbility.id).withName('Strength').build();

            await expect(service.update(updatedAbility)).rejects.toThrow(
                new BadRequestException(`Cannot update Ability because the name 'Strength' is already used`)
            );
            expect(mockAbilityDB.findOneById(defaultAbility.id)).not.toEqual(updatedAbility);
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTest();
            const newAbilityData = new AbilityBuilder().withName('Strength').build();

            expect(mockAbilityDB.findAll()).toHaveLength(1);

            await service.create(newAbilityData);

            expect(mockAbilityDB.findAll()).toHaveLength(2);
            expect(mockAbilityDB.findOneByName('Strength')).toEqual(
                expect.objectContaining({ ...newAbilityData, id: expect.any(String) })
            );
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTest();
            const newAbilityData = new AbilityBuilder().withName('Dexterity').build();

            await expect(service.create(newAbilityData)).rejects.toThrow(
                new NotFoundException(`Cannot create Ability because the name 'Dexterity' is already used`)
            );
        });
    });

    describe('remove', () => {
        it('should remove', async () => {
            const { service } = await setupTest();

            await service.remove(defaultAbility.id);
            expect(mockAbilityDB.findOneById(defaultAbility.id)).toBeNull();
        });

        it('should not remove and throw 404', async () => {
            const { service } = await setupTest();
            const id = createId();

            await expect(service.remove(id)).rejects.toThrow(
                `Could not remove Ability with ID: '${id}' because it does not exist`
            );
        });
    });
});
