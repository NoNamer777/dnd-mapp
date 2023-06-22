import { Test } from '@nestjs/testing';
import { abilityRepositoryProvider } from '../../../../testing';
import { AbilityService } from './ability.service';
import { defaultAbility, mockAbilityDb } from '@dnd-mapp/data/testing';
import { NotFoundException } from '@nestjs/common';

describe('AbilityService', () => {
    async function setupTestEnvironment() {
        const module = await Test.createTestingModule({
            providers: [AbilityService, abilityRepositoryProvider],
        }).compile();

        return {
            service: module.get(AbilityService),
        };
    }

    describe('get by name', () => {
        it('should get Ability by name', async () => {
            const { service } = await setupTestEnvironment();

            expect(await service.findByName('Test Ability')).toEqual(defaultAbility);
        });

        it('should throw 404', async () => {
            const { service } = await setupTestEnvironment();

            await expect(service.findByName('Ability Test')).rejects.toThrowError(
                new NotFoundException(`Ability with name: 'Ability Test' is not found.`)
            );
        });
    });

    describe('update', () => {
        it('should update', async () => {
            const { service } = await setupTestEnvironment();
            const newAbilityData = { id: 1, name: 'Ability Test Test' };

            expect(await service.update(newAbilityData)).toEqual(newAbilityData);
            expect(mockAbilityDb.findOneBy({ id: 1 })).toEqual(expect.objectContaining(newAbilityData));
        });

        it('should throw 404 when using ID of non existing Ability', async () => {
            const { service } = await setupTestEnvironment();
            const newAbilityData = { id: 2, name: 'Ability Test Test' };

            await expect(service.update(newAbilityData)).rejects.toThrowError(
                new NotFoundException(`Cannot update Ability with ID: '2' because it does not exist.`)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            mockAbilityDb.insert({ name: 'Ability Test Test' });

            const { service } = await setupTestEnvironment();
            const newAbilityData = { id: 1, name: 'Ability Test Test' };

            await expect(service.update(newAbilityData)).rejects.toThrowError(
                new NotFoundException(
                    `Cannot update Ability with ID: '1' because the name: 'Ability Test Test' is already in use by another Ability (ID: '2').`
                )
            );
            expect(mockAbilityDb.findOneBy({ id: 1 })).toEqual(expect.not.objectContaining(newAbilityData));
        });
    });

    describe('create', () => {
        it('should create', async () => {
            const { service } = await setupTestEnvironment();
            const newAbilityData = { name: 'New Ability Test' };

            expect((await service.create(newAbilityData)).id).toBeDefined();
            expect(mockAbilityDb.findOneBy({ name: 'New Ability Test' })).toEqual(
                expect.objectContaining(newAbilityData)
            );
        });

        it('should throw 400 when using non unique name', async () => {
            const { service } = await setupTestEnvironment();
            const newAbilityData = { name: 'Test Ability' };

            await expect(service.create(newAbilityData)).rejects.toThrowError(
                new NotFoundException(
                    `Cannot create Ability because the name: 'Test Ability' is already in use by another Ability (ID: '1').`
                )
            );
        });
    });
});
