import { Abilities, AbilityBuilder, CreateAbilityData } from '@dnd-mapp/data';
import { defaultAbility, mockAbilityDB } from '@dnd-mapp/data/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockAbilityModuleProviders, mockLoggingServiceProvider } from '../../../../testing';
import { EntityService } from '../entity.service';
import { AbilityService } from './ability.service';
import { abilityServiceProvider } from './providers';

describe('AbilityService', () => {
    async function setupTestEnvironment() {
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
        const { service } = await setupTestEnvironment();

        expect((await service.findAll()).length).toEqual(1);
    });

    describe('get by ID', () => {
        it('should get Ability by ID', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findById(defaultAbility.id)).toEqual(defaultAbility);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findById(2)).rejects.toThrow(
                new NotFoundException(`Ability with ID: '2' is not found`)
            );
        });

        it('should not throw 404 when not found', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findById(2, false)).toBeNull();
        });
    });

    describe('get by name', () => {
        it('should get Ability by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByName(Abilities.DEXTERITY)).toEqual(defaultAbility);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByName(Abilities.STRENGTH)).rejects.toThrow(
                new NotFoundException(`Ability with name: 'Strength' is not found`)
            );
        });

        it('should not throw 404 when not found', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByName(Abilities.STRENGTH, false)).toBeNull();
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            defaultAbility.name = Abilities.STRENGTH;

            await service.update(defaultAbility);

            expect(mockAbilityDB.findOneById(defaultAbility.id).name).toEqual(Abilities.STRENGTH);
        });

        it('should throw 404 when using ID of non existing Ability', async () => {
            const { service } = await setupTestEnvironment();
            const newAbilityData = new AbilityBuilder().withId(2).build();

            await expect(service.update(newAbilityData)).rejects.toThrow(
                new NotFoundException(`Cannot update Ability with ID: '2' because it does not exist`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockAbilityDB.insert({ name: Abilities.STRENGTH, skills: [] });

            const { service } = await setupTestEnvironment();
            const newAbility = new AbilityBuilder().withName(Abilities.STRENGTH).withId(defaultAbility.id).build();

            await expect(service.update(newAbility)).rejects.toThrow(
                new BadRequestException(`Cannot update Ability because the name 'Strength' is already used`)
            );
            expect(mockAbilityDB.findOneById(defaultAbility.id).name).not.toEqual(Abilities.STRENGTH);
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newAbilityData: CreateAbilityData = { name: Abilities.STRENGTH, skills: [] };

            const createdAbility = await service.create(newAbilityData);

            expect(createdAbility.id).toEqual(2);
            expect(mockAbilityDB.findOneByName(Abilities.STRENGTH)).toEqual(createdAbility);
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newAbilityData: CreateAbilityData = { name: Abilities.DEXTERITY, skills: [] };

            await expect(service.create(newAbilityData)).rejects.toThrow(
                new NotFoundException(`Cannot create Ability because the name 'Dexterity' is already used`)
            );
        });
    });

    describe('remove', () => {
        it('should remove', async () => {
            const { service } = await setupTestEnvironment();

            await service.remove(defaultAbility.id);
            expect(mockAbilityDB.findOneById(defaultAbility.id)).toBeNull();
        });

        it('should not remove and throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.remove(2)).rejects.toThrow(
                `Could not remove Ability with ID: '2' because it does not exist`
            );
        });
    });
});
